import React, { Fragment, useEffect, useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import Form from 'react-bootstrap/esm/Form';
import { ISearchResponseData } from '../../interfaces/ISearchResponse.interface';
import { api } from '../../services/api';

interface Props {
  setSelectedOptions(selected: ISearchResponseData[]): void;
  selectedOptions: ISearchResponseData[];
}

const TechnologiesSelector: React.FC<Props> = ({
  selectedOptions,
  setSelectedOptions,
}: Props) => {
  // const [selectedOptions, setSelectedOptions] = useState<ISearchResponseData[]>(
  //   []
  // );
  const [options, setOptions] = useState<ISearchResponseData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get<ISearchResponseData[]>('/technologies');

      if (response && response.data) {
        setOptions(response.data);
      }
    };

    fetchData();
  }, []);

  return (
    <Fragment>
      <Form.Group style={{ marginTop: '20px' }}>
        <Form.Label>Digite para definir as tecnologias de interesse</Form.Label>
        <Typeahead<ISearchResponseData>
          id="basic-typeahead-multiple"
          multiple
          onChange={setSelectedOptions}
          options={options}
          placeholder="Selecione as tecnologias desejáveis"
          selected={selectedOptions}
          emptyLabel="Nenhum resultado encontrado"
        />
      </Form.Group>
    </Fragment>
  );
};

export default TechnologiesSelector;
