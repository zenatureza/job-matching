import React, { useRef, useEffect, useState } from 'react';
import { OptionTypeBase, ValueType } from 'react-select';
import Select, { Props as AsyncProps } from 'react-select/async';
import { useField } from '@unform/core';
import { OptionType } from '../../interfaces/ISelectOption.interface';

interface Props extends AsyncProps<OptionTypeBase, boolean> {
  name: string;
}

const AsyncFormSelect: React.FC<Props> = ({ name, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const [selectedOption, setSelectedOption] = useState<
    ValueType<OptionType, false>
  >();

  const handleChange = (option: ValueType<OptionType, false>) => {
    // console.log(option);
    setSelectedOption(option);
  };

  useEffect(() => {
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
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <Select
      cacheOptions
      defaultValue={defaultValue}
      value={selectedOption}
      ref={selectRef}
      classNamePrefix="react-select"
      onChange={(option) => {
        handleChange(option as ValueType<OptionType, false>);
      }}
      {...rest}
    />
  );
};

export default AsyncFormSelect;
