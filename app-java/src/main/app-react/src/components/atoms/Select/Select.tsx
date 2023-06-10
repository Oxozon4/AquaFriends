import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import {
  StyledSelect,
  StyledOption,
  StyledWrapper,
  StyledIconWrapper,
} from './Select-styled';
import Icon from '../Icon/Icon';

interface SelectProps {
  options: {
    label: string;
    value: string;
  }[];
  register: any;
  validators: any;
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  id: string;
  title?: string;
  defaultValue?: any;
}

const Select = ({
  options,
  register,
  validators,
  error,
  id,
  defaultValue,
}: SelectProps) => {
  return (
    <StyledWrapper>
      <StyledSelect
        id={id}
        name="selectInput"
        error={error}
        defaultValue={defaultValue}
        placeholder="Wybierz opcje"
        {...register(id, validators)}
      >
        <StyledOption>Wybierz opcje</StyledOption>
        {options.map(({ value, label }) => {
          return (
            <StyledOption key={value} value={value}>
              {label}
            </StyledOption>
          );
        })}
      </StyledSelect>
      <StyledIconWrapper>
        <Icon variant="ArrowDown" withhover="false" size="32px" />
      </StyledIconWrapper>
    </StyledWrapper>
  );
};

export default Select;
