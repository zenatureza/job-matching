import { useField } from '@unform/core';
import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import { FormGroup } from 'react-bootstrap';
import { ISearchRequest } from '../../interfaces/ISearchRequest.interface';
import { ISearchResponse } from '../../interfaces/ISearchResponse.interface';
import { api } from '../../services/api';

import { Input } from './styles';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  // searchUrl?: string;
  name: string;
}

const FormInput: React.FC<Props> = ({ name, ...rest }: Props) => {
  // const [searchResponse, setSearchResponse] = useState<ISearchResponse | null>(
  //   null
  // );

  // const handleSearch = async (searchRequest: ISearchRequest) => {
  //   const response = await api.get(searchRequest.url, {
  //     params: { filter: searchRequest.filter },
  //   });

  //   const { data } = response.data;

  //   setTimeout(() => {
  //     setSearchResponse({ data });
  //   }, 500);
  // };

  // return (
  //   <FormGroup>
  //     <Input
  //       onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
  //         const { value } = event.target;
  //         if (value.length < 3 || !searchUrl) {
  //           return setSearchResponse(null);
  //         }

  //         const searchRequest: ISearchRequest = {
  //           filter: value,
  //           url: searchUrl,
  //         };
  //         handleSearch(searchRequest);
  //       }}
  //       className="form-control"
  //     />

  //     {/* {searchResponse && (
  //       <Autocomplete searchResponse={searchResponse} inputRef={inputRef} />
  //     )} */}
  //   </FormGroup>
  // );
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return <input ref={inputRef} defaultValue={defaultValue} {...rest} />;
};

export default FormInput;
