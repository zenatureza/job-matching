import { FormHandles } from '@unform/core';
import { Form as UnformForm } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import * as Yup from 'yup';
import AsyncFormSelect from '../../components/AsyncFormSelect';
import CandidateCard from '../../components/CandidateCard';
import FormInput from '../../components/FormInput';
import TechnologiesSelector from '../../components/TechnologiesSelector';
import IGetBestCandidatesRequest from '../../interfaces/IGetBestCandidatesRequest.interface';
import IGetBestCandidatesResponse from '../../interfaces/IGetBestCandidatesResponse.interface';
import { ISearchRequest } from '../../interfaces/ISearchRequest.interface';
import { ISearchResponseData } from '../../interfaces/ISearchResponse.interface';
import { api } from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

const Index: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [selectedOptions, setSelectedOptions] = useState<ISearchResponseData[]>(
    []
  );

  const [candidates, setCandidates] = useState<IGetBestCandidatesResponse>();

  const [loading, setLoading] = useState<boolean>(false);

  const validateFormData = useCallback(
    async (formData: IGetBestCandidatesRequest) => {
      try {
        formRef.current?.setErrors({});

        const { endExperienceRange } = formData;

        const schema = Yup.object().shape({
          cityId: Yup.string().uuid().required('Selecione uma cidade válida'),
          startExperienceRange: Yup.number()
            .integer()
            .moreThan(0)
            .required('Selecione o tempo mínimo de experiência'),
          endExperienceRange: Yup.number()
            .integer()
            .moreThan(endExperienceRange)
            .required('Selecione o tempo mínimo de experiência'),
          technologiesIds: Yup.array().required(
            'Selecione pelo menos uma tecnologia'
          ),
        });

        await schema.validate(formData, {
          abortEarly: false,
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          // console.log(errors);
          // console.log(formData);

          // if (errors['licencas']) {
          //   toastMessage = '\nSelecione pelo menos uma licença!';
          // }

          formRef.current?.setErrors(errors);
        }
      }
    },
    []
  );

  const getCity = useCallback(() => {
    const cityRef = formRef.current?.getFieldRef(`city`) as any;

    const cityProps = cityRef['props'];
    let city = '';
    if (cityProps && 'value' in cityProps && 'id' in cityProps['value']) {
      city = cityProps['value']['label'];
    }

    return city;
  }, []);

  const handleSubmit = useCallback(
    async (formData: IGetBestCandidatesRequest) => {
      try {
        await validateFormData(formData);

        const cityRef = formRef.current?.getFieldRef(`city`) as any;

        const cityProps = cityRef['props'];
        let cityId = '';
        if (cityProps && 'value' in cityProps && 'id' in cityProps['value']) {
          cityId = cityProps['value']['id'];
        }

        const {
          startExperienceRange,
          endExperienceRange,
          // technologiesIds,
        } = formData;

        setLoading(true);
        const response = await api.get<IGetBestCandidatesResponse>(
          '/candidates',
          {
            params: {
              cityId,
              startExperienceRange,
              endExperienceRange,
              technologiesIds: selectedOptions.map((item) => item.id),
            },
          }
        );

        console.log(response.data);
        setCandidates(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [validateFormData, selectedOptions]
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
      {loading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      <h6>Busque candidatos para a vaga conforme os filtros:</h6>

      <>
        <Row>
          <Col xs={12} md={12}>
            <UnformForm ref={formRef} id="form" onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <AsyncFormSelect
                  loadOptions={promiseOptions}
                  name="city"
                  placeholder="Selecione a cidade"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <FormInput
                  className="form-control"
                  name="startExperienceRange"
                  placeholder="Digite o tempo mínimo de experiência"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <FormInput
                  className="form-control"
                  name="endExperienceRange"
                  placeholder="Digite o tempo máximo de experiência"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <TechnologiesSelector
                  selectedOptions={selectedOptions}
                  setSelectedOptions={setSelectedOptions}
                />
              </div>

              <Button form="form" type="submit">
                Buscar melhores candidatos
              </Button>
            </UnformForm>
          </Col>
        </Row>

        {candidates && (
          <ul style={{ display: 'flex' }}>
            {candidates.candidates.map((candidate) => (
              <CandidateCard
                candidateId={candidate.candidate_id}
                city={candidate.city}
                key={candidate.candidate_id}
                technologies={candidate.technologies}
                expectedCity={getCity()}
              />
            ))}
          </ul>
        )}
      </>

      {/* TODO: Componente que contém uma lista de vagas */}
      {/* <div>
        Ou navegue nas vagas disponíveis abaixo para encontrá-los:
        <ul>
          <li>Vaga 1</li>
          <li>Vaga 2</li>
          <li>Vaga 3</li>
        </ul>
      </div> */}
    </>
  );
};

export default Index;
