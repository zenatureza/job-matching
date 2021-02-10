import { useField } from '@unform/core';
import React, { useEffect, useRef } from 'react';
import { FormControl } from 'react-bootstrap';
import Form from 'react-bootstrap/esm/Form';

interface Props {
  name: string;
}

const FormInput: React.FC<any> = ({ name, ...rest }: Props) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <>
      <FormControl
        isInvalid={!!error}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />

      <Form.Control.Feedback type="invalid" tooltip>
        {error}
      </Form.Control.Feedback>
    </>
  );
};

export default FormInput;
