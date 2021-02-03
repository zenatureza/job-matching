import React, { useState } from 'react';
import { FormGroup } from 'react-bootstrap';
import { ISearchRequest } from '../../interfaces/ISearchRequest.interface';
import { ISearchResponse } from '../../interfaces/ISearchResponse.interface';
import { api } from '../../services/api';

import { Input } from './styles';

interface Props {
  searchUrl?: string;
}

const FormInput: React.FC<Props> = ({ searchUrl }: Props) => {
  const [searchResponse, setSearchResponse] = useState<ISearchResponse | null>(
    null
  );

  const handleSearch = async (searchRequest: ISearchRequest) => {
    const response = await api.get(searchRequest.url, {
      params: { filter: searchRequest.filter },
    });

    const { data } = response.data;

    setTimeout(() => {
      setSearchResponse({ data });
    }, 500);
  };

  return (
    <FormGroup>
      <Input
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const { value } = event.target;
          if (value.length < 3 || !searchUrl) {
            return setSearchResponse(null);
          }

          const searchRequest: ISearchRequest = {
            filter: value,
            url: searchUrl,
          };
          handleSearch(searchRequest);
        }}
        className="form-control"
      />

      {/* {searchResponse && (
        <Autocomplete searchResponse={searchResponse} inputRef={inputRef} />
      )} */}
    </FormGroup>
  );
};

export default FormInput;
