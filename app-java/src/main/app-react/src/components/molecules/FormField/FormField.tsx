import TextInput from '../../atoms/TextInput/TextInput';

interface FormFieldProps {
  type: string;
  title: string;
  id: string;
  register: any;
  validators: any;
  autocomplete?: string;
  variant?: string;
}

const FormField = ({
  type,
  title,
  id,
  register,
  validators,
  autocomplete,
}: FormFieldProps) => {
  const formattedLabel = title + (validators?.required?.value ? ' *' : '');
  return (
    <>
      {(type === 'text' || type === 'password') && (
        <TextInput
          label={formattedLabel}
          register={register}
          id={id}
          validators={validators}
          autocomplete={autocomplete}
          type={type}
        />
      )}
    </>
  );
};

export default FormField;
