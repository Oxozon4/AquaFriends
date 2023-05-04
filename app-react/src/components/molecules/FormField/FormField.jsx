import React, { useState } from 'react';
import { BsSquare, BsCheckSquare } from 'react-icons/bs';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Label } from 'components/atoms/Label/Label';
import { Input, TextArea } from 'components/atoms/Input/Input';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { selectCustomStyles } from 'assets/styles/selectCustomStyles';
import Stepper from 'components/molecules/Stepper/Stepper';
import { EyeOutline } from '@styled-icons/evaicons-outline/EyeOutline';
import { PasswordInputWrapper, DarkEyeStyleWrapper, FileButton } from './FormField-styled';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  ${({ type }) =>
    type === 'checkbox' &&
    `
    flex-direction: row-reverse;
    justify-content: flex-end;
    align-items: center;
    ${Label} {
      margin-left: 15px;
      padding: 3px 0 3px;
    }
  `};
  ${({ type }) => type !== 'checkbox' && ` width: 100%;`};
`;

const FormField = ({
  onChange,
  value,
  label,
  name,
  id,
  type = 'text',
  disabled = false,
  options,
  checked,
  onFocus = () => {},
  maxLength,
  placeholder,
}) => {
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <Wrapper type={type}>
      <Label htmlFor={id}>{label}</Label>
      {type === 'text' ? (
        <Input
          name={name}
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          onFocus={onFocus}
          maxLength={maxLength}
          placeholder={placeholder}
        />
      ) : (
        ''
      )}
      {type === 'password' ? (
        <>
          <PasswordInputWrapper>
            <Input type={passwordShown ? 'text' : 'password'} name={name} placeholder={placeholder} value={value} onChange={onChange} />
            <DarkEyeStyleWrapper onClick={togglePassword}>
              <EyeOutline size="24" />
            </DarkEyeStyleWrapper>
          </PasswordInputWrapper>
        </>
      ) : (
        ''
      )}
      {type === 'checkbox' ? <Input name={name} id={id} checked={checked} type={type} onChange={onChange} disabled={disabled} /> : ''}
      {type === 'textarea' ? <TextArea name={name} id={id} type={type} value={value} onChange={onChange} disabled={disabled} /> : ''}
      {type === 'select' ? (
        <Select styles={selectCustomStyles} defaultValue={value} onChange={onChange} disabled={disabled} placeholder="Wybierz..." options={options} />
      ) : (
        ''
      )}
      {type === 'multiSelect' ? (
        <Select
          isMulti
          styles={selectCustomStyles}
          defaultValue={value}
          onChange={onChange}
          disabled={disabled}
          placeholder="Wybierz..."
          options={options}
        />
      ) : (
        ''
      )}
      {type === 'creatableSelect' ? (
        <CreatableSelect isMulti defaultValue={value} styles={selectCustomStyles} onChange={onChange} placeholder="Wybierz..." options={options} />
      ) : (
        ''
      )}
      {type === 'stepper' ? <Stepper title="" value={value} updateValue={onChange} minValue={0}></Stepper> : ''}
      {type === 'file' ? (
        <>
          <FileButton htmlFor={id}>Wybierz</FileButton>
          <Input
            name={name}
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            disabled={disabled}
            placeholder={`Upload an ${name}`}
            accept=".png, .jpg, .jpeg"
          />
        </>
      ) : (
        ''
      )}
    </Wrapper>
  );
};

FormField.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  checked: PropTypes.any,
  onFocus: PropTypes.func,
  options: PropTypes.any,
  maxLength: PropTypes.any,
};

export default FormField;
