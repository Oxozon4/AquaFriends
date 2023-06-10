import { useFormContext, Controller } from 'react-hook-form';

import Select from 'react-select';
import { MultiSelectWrapper, MultiSelectLabel } from './MultiSelect-styled';

interface MultiSelectProps {
  options?: { value: string; label: string }[];
  id: string;
  defaultValues: any;
  label: string;
}

const MultiSelect = ({
  options,
  id,
  defaultValues,
  label,
}: MultiSelectProps) => {
  const { control } = useFormContext();
  // const { error } = getFieldState(id, formState);

  if (!options) {
    return null;
  }
  return (
    <MultiSelectWrapper>
      <MultiSelectLabel>{label}</MultiSelectLabel>
      <Controller
        control={control}
        name={id}
        defaultValue={defaultValues}
        render={({ field: { onChange } }) => (
          <Select
            // value={options.filter((choice) => value?.includes(choice.value))}
            onChange={(val) => onChange(val.map((c) => c.value))}
            options={options}
            defaultValue={defaultValues}
            isMulti
            placeholder="Wybierz opcje"
          />
        )}
      />
    </MultiSelectWrapper>
  );
};

export default MultiSelect;
