import React, { Fragment, useEffect, useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import Form from 'react-bootstrap/esm/Form';
import { ISearchResponseData } from '../../interfaces/ISearchResponse.interface';

const BasicExample: React.FC = () => {
  // const [singleSelections, setSingleSelections] = useState([]);
  const [multiSelections, setMultiSelections] = useState<ISearchResponseData[]>(
    []
  );

  useEffect(() => {
    console.log(multiSelections);
  });

  return (
    <Fragment>
      {/* <Form.Group>
        <Form.Label>Single Selection</Form.Label>
        <Typeahead
          id="basic-typeahead-single"
          labelKey="name"
          onChange={setSingleSelections}
          options={options}
          placeholder="Choose a state..."
          selected={singleSelections}
        />
      </Form.Group> */}
      <Form.Group style={{ marginTop: '20px' }}>
        <Form.Label>Multiple Selections</Form.Label>
        <Typeahead<ISearchResponseData>
          id="basic-typeahead-multiple"
          // labelKey="name"
          multiple
          onChange={setMultiSelections}
          options={[
            { id: 1, label: 'C#' },
            { id: 2, label: 'TypeScript' },
          ]}
          placeholder="Selecione as tecnologias desejáveis"
          selected={multiSelections}
          emptyLabel="Nenhum resultado encontrado"
        />
      </Form.Group>
    </Fragment>
  );
};

export default BasicExample;
