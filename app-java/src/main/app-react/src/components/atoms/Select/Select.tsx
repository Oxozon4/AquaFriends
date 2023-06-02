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
}

const Select = ({ options, register, validators, error, id }: SelectProps) => {
  return (
    <StyledWrapper>
      <StyledSelect
        id={id}
        name="selectInput"
        {...register(id, validators)}
        error={error}
      >
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
