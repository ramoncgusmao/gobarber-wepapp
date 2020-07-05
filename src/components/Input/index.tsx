import React, { InputHTMLAttributes, useEffect, useRef, useState, useCallback } from 'react';
import { Container } from './style';
import { IconBaseProps } from 'react-icons/lib';
import { useField } from '@unform/core';
import * as Yup from 'yup';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);

  }, []);


  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  return (
    <Container isFocused={isFocused} isFilled={isFilled}>

      {Icon && <Icon size={20} />}
      <input onFocus={handleInputBlur}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef} {...rest} />

    </Container>
  );
};

export default Input;