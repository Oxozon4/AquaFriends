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
  isDisabled?: boolean;
}

const TextInput = ({
  label,
  id,
  register,
  validators,
  type = 'text',
  autocomplete = 'off',
  isDisabled,
}: TextInputProps) => {
  const { trigger, getValues, getFieldState, formState } = useFormContext();
  const [isFocused, setIsFocused] = useState(getValues(id) ? true : false);
  const [forceRerender, setForceRerender] = useState(false);
  const { error } = getFieldState(id, formState);

  const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setIsFocused(false);
    } else if (error?.message) {
      trigger(id);
      setForceRerender(!forceRerender);
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
        disabled={isDisabled}
      />
      {error?.message && (
        <TextInputErrorLabel>{error.message}</TextInputErrorLabel>
      )}
    </TextInputWrapper>
  );
};

export default TextInput;
