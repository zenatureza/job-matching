import { useField } from '@unform/core';
import React, { useEffect, useRef } from 'react';
import { OptionTypeBase, ValueType } from 'react-select';
import Select, { Props as AsyncProps } from 'react-select/async';
import { OptionType } from '../../interfaces/ISelectOption.interface';

interface Props extends AsyncProps<OptionTypeBase, boolean> {
  name: string;
  selectedCity: OptionType | null | undefined;
  setSelectedCity(city: OptionType): void;
}

const AsyncFormSelect: React.FC<Props> = ({
  name,
  city,
  selectedCity,
  setSelectedCity,
  ...rest
}) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const handleChange = (option: ValueType<OptionType, false>) => {
    if (!option) return;
    setSelectedCity(option);
  };

  useEffect(() => {
    console.log(error);

    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return [];
          }

          return ref.select.state.value.map(
            (option: OptionTypeBase) => option.value
          );
        }
        if (!ref.select.state.value) {
          return '';
        }

        return ref.select.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti, error]);

  return (
    <>
      <Select
        cacheOptions
        defaultValue={defaultValue}
        value={selectedCity}
        ref={selectRef}
        classNamePrefix="react-select"
        onChange={(option) => {
          handleChange(option as ValueType<OptionType, false>);
        }}
        {...rest}
      />
    </>
  );
};

export default AsyncFormSelect;
