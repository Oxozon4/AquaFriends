import TextInput from '../../atoms/TextInput/TextInput';
import MultiSelect from '../../atoms/MultiSelect/MultiSelect';

interface FormFieldProps {
  type: string;
  title: string;
  id: string;
  register: any;
  validators: any;
  autocomplete?: string;
  variant?: string;
  options?: { value: string; label: string }[];
  defaultValues?: any;
}

const FormField = ({
  type,
  title,
  id,
  register,
  validators,
  autocomplete,
  options,
  defaultValues,
}: FormFieldProps) => {
  const formattedLabel = title + (validators?.required?.value ? ' *' : '');
  return (
    <>
      {(type === 'text' ||
        type === 'password' ||
        type === 'number' ||
        type === 'email') && (
        <TextInput
          label={formattedLabel}
          register={register}
          id={id}
          validators={validators}
          autocomplete={autocomplete}
          type={type}
        />
      )}
      {type === 'select' && (
        <MultiSelect
          options={options}
          id={id}
          defaultValues={defaultValues}
          label={formattedLabel}
        />
      )}
    </>
  );
};

export default FormField;
