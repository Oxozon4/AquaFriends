import { useState, FocusEvent } from 'react';
import {
  TextInputWrapper,
  TextInputField,
  TextInputLabel,
  TextInputErrorLabel,
} from './TextInput-styled';
import { useFormContext } from 'react-hook-form';

interface TextInputProps {
  label: string;
  register: any;
  validators: any;
  id: string;
  autocomplete?: string;
  type?: string;
}

const TextInput = ({
  label,
  id,
  register,
  validators,
  type = 'text',
  autocomplete = 'off',
}: TextInputProps) => {
  const { trigger, getValues, getFieldState } = useFormContext();
  const [isFocused, setIsFocused] = useState(getValues(id) ? true : false);
  const { error } = getFieldState(id);

  const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setIsFocused(false);
    } else if (error?.message) {
      trigger(id);
    }
  };

  const onFocusHandler = () => {
    setIsFocused(true);
  };

  return (
    <TextInputWrapper>
      <TextInputLabel htmlFor={id} isInputFocused={isFocused} error={error}>
        {label}
      </TextInputLabel>
      <TextInputField
        type={type}
        id={id}
        name="textInput"
        {...register(id, validators)}
        error={error}
        autoComplete={autocomplete}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
      />
      {error?.message && (
        <TextInputErrorLabel>{error.message}</TextInputErrorLabel>
      )}
    </TextInputWrapper>
  );
};

export default TextInput;
