import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  useFormContext,
} from 'react-hook-form';
import {
  StyledSelect,
  StyledOption,
  StyledWrapper,
  StyledIconWrapper,
  StyledErrorMesssage,
} from './Select-styled';
import Icon from '../Icon/Icon';

interface SelectProps {
  options: {
    label: string;
    value: string;
  }[];
  register: any;
  validators: any;
  id: string;
  title?: string;
  defaultValue?: any;
  isDisabled?: boolean;
}

const Select = ({
  options,
  register,
  validators,
  id,
  defaultValue,
  isDisabled,
  title,
}: SelectProps) => {
  const methods = useFormContext();
  const { trigger, getValues, getFieldState, formState } = methods || {};
  let error: any;

  if (getFieldState) {
    error = getFieldState(id, formState).error;
  }

  const onBlurHandler = () => {
    if (error?.message && trigger) {
      trigger(id);
    }
  };

  return (
    <>
      <StyledWrapper>
        <StyledSelect
          id={id}
          name="selectInput"
          defaultValue={defaultValue}
          placeholder={title || 'Wybierz opcje'}
          disabled={isDisabled}
          {...register(id, validators)}
          error={error?.message}
          onBlur={onBlurHandler}
        >
          <StyledOption>{title || 'Wybierz opcje'}</StyledOption>
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
      {error?.message && (
        <StyledErrorMesssage>{error.message}</StyledErrorMesssage>
      )}
    </>
  );
};

export default Select;
