import { FormHandles } from '@unform/core';
import { Form as UnformForm } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import { Button, CardDeck, Col, Form, Spinner } from 'react-bootstrap';
import { ValueType } from 'react-select';
import * as Yup from 'yup';
import AsyncFormSelect from '../../components/AsyncFormSelect';
import CandidateCard from '../../components/CandidateCard';
import FormInput from '../../components/FormInput';
import TechnologiesSelector from '../../components/TechnologiesSelector';
import { ToastTypesEnum } from '../../enums/toastTypes.enum';
import useToast from '../../hooks/useToast';
import IGetBestCandidatesRequest from '../../interfaces/IGetBestCandidatesRequest.interface';
import IGetBestCandidatesResponse from '../../interfaces/IGetBestCandidatesResponse.interface';
import { ISearchRequest } from '../../interfaces/ISearchRequest.interface';
import { ISearchResponseData } from '../../interfaces/ISearchResponse.interface';
import { OptionType } from '../../interfaces/ISelectOption.interface';
import { api } from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

const Index: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [selectedTechnologies, setSelectedTechnologies] = useState<
    ISearchResponseData[]
  >([]);

  const [selectedCity, setSelectedCity] = useState<
    ValueType<OptionType, false>
  >();

  const [candidates, setCandidates] = useState<IGetBestCandidatesResponse>();

  const [loading, setLoading] = useState<boolean>(false);

  const [isFormValid, setIsFormValid] = useState<boolean>(true);

  const validateFormData = useCallback(
    async (formData: IGetBestCandidatesRequest) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          cityId: Yup.string().uuid().required('Selecione uma cidade válida'),
          startExperienceRange: Yup.number()
            .integer()
            .typeError('Insira o tempo mínimo de experiência')
            .required('Insira o tempo mínimo de experiência'),
          technologiesIds: Yup.array()
            .min(1, 'Selecione ao menos uma tecnologia')
            .required('Selecione pelo menos uma tecnologia'),
        });

        formData.technologiesIds = selectedTechnologies.map((tech) => tech.id);

        await schema.validate(formData, {
          abortEarly: false,
        });

        setIsFormValid(true);
      } catch (error) {
        setIsFormValid(false);

        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);
        }

        return;
      }
    },
    [selectedTechnologies]
  );

  const getCity = useCallback(() => {
    const cityRef = formRef.current?.getFieldRef(`city`) as any;

    const cityProps = cityRef['props'];
    let city = '';
    if (
      typeof cityProps !== 'undefined' &&
      'value' in cityProps &&
      'id' in cityProps['value']
    ) {
      city = cityProps['value']['label'];
    }

    return city;
  }, []);

  const handleSubmit = useCallback(
    async (formData: IGetBestCandidatesRequest) => {
      try {
        await validateFormData(formData);
      } catch (error) {
        return error;
      }

      try {
        const cityRef = formRef.current?.getFieldRef(`city`) as any;

        const cityProps = cityRef['props'];
        let cityId = '';
        if (cityProps && 'value' in cityProps && 'id' in cityProps['value']) {
          cityId = cityProps['value']['id'];
        }

        const { startExperienceRange, endExperienceRange } = formData;

        setLoading(true);
        const response = await api.get<IGetBestCandidatesResponse>(
          '/candidates',
          {
            params: {
              cityId,
              startExperienceRange,
              endExperienceRange: !endExperienceRange ? 0 : endExperienceRange,
              technologiesIds: selectedTechnologies.map((item) => item.id),
            },
          }
        );

        if (!response.data) {
          addToast({
            type: ToastTypesEnum.error,
            title: 'Erro ao obter os dados',
            description: 'Ocorreu um erro ao buscar os candidatos',
          });
        }

        setCandidates(response.data);
      } catch (error) {
        addToast({
          type: ToastTypesEnum.error,
          title: 'Erro ao obter os dados',
          description: 'Ocorreu um erro ao buscar os candidatos',
        });
      } finally {
        setLoading(false);
      }
    },
    [validateFormData, selectedTechnologies, addToast]
  );

  const handleCitySearch = async (searchRequest: ISearchRequest) => {
    const response = await api.get(searchRequest.url, {
      params: { filter: searchRequest.filter },
    });

    const data = response.data;

    // setSearchResponse({ data });

    return data;
  };

  const promiseOptions = async (inputValue: string): Promise<any> => {
    if (inputValue && inputValue.length >= 3)
      return await handleCitySearch({ url: '/cities', filter: inputValue });
  };

  return (
    <>
      <UnformForm ref={formRef} id="form" onSubmit={handleSubmit}>
        <>
          <Form.Row style={{ margin: '1em' }}>
            <Form.Group as={Col}>
              <Form.Label>Insira as tecnologias desejadas</Form.Label>
              <TechnologiesSelector
                selectedOptions={selectedTechnologies}
                setSelectedOptions={setSelectedTechnologies}
              />

              {!isFormValid &&
                (!selectedTechnologies ||
                  (selectedTechnologies.length <= 0 && (
                    <Form.Control.Feedback
                      type="invalid"
                      tooltip
                      style={{ display: 'block' }}
                    >
                      {'Selecione ao menos uma tecnologia'}
                    </Form.Control.Feedback>
                  )))}
            </Form.Group>
          </Form.Row>

          <Form.Row style={{ margin: '1em' }}>
            <Form.Group as={Col}>
              <Form.Label>Busque a cidade</Form.Label>
              <AsyncFormSelect
                loadOptions={promiseOptions}
                name="city"
                placeholder="Selecione..."
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
              />

              {!isFormValid && !selectedCity && (
                <Form.Control.Feedback
                  type="invalid"
                  tooltip
                  style={{ display: 'block' }}
                >
                  {'Selecione a cidade'}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Tempo mínimo de experiência</Form.Label>
              <FormInput
                className="form-control"
                name="startExperienceRange"
                // placeholder="Digite o tempo mínimo de experiência"
                type="number"
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Tempo limite de experiência</Form.Label>
              <FormInput
                className="form-control"
                name="endExperienceRange"
                // placeholder="Digite o tempo máximo de experiência"
                type="number"
              />
            </Form.Group>
          </Form.Row>

          <Form.Row style={{ margin: '1em' }}>
            <Form.Group as={Col}>
              <Button disabled={!!loading} form="form" type="submit">
                {!loading ? 'Buscar melhores candidatos' : 'Buscando...'}
              </Button>
            </Form.Group>
          </Form.Row>
        </>
      </UnformForm>

      {loading && (
        <Form.Row
          className="m-1"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="secondary" />
          <Spinner animation="grow" variant="success" />
          <Spinner animation="grow" variant="danger" />
          <Spinner animation="grow" variant="warning" />
        </Form.Row>
      )}

      {candidates && !loading && (
        <Col>
          <p style={{ margin: '1em', marginBottom: '.5em' }}>
            Os melhores candidatos encontrados para a vaga são:
          </p>
          <CardDeck className="col-md-12">
            {candidates.candidates.map((candidate) => (
              <CandidateCard
                candidateId={candidate.candidate_id}
                city={candidate.city}
                key={candidate.candidate_id}
                technologies={candidate.technologies}
                expectedCity={getCity()}
                experience={candidate.experience}
                selectedTechnologies={selectedTechnologies.map(
                  (tech) => tech.id
                )}
              />
            ))}
          </CardDeck>
        </Col>
      )}
    </>
  );
};

export default Index;
