import styled from 'styled-components';

export const TextInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 30px 0;
  width: 100%;
  transition: bottom 0.3s ease-in-out;
`;

interface TextInputLabelProps {
  isInputFocused: boolean;
  error: any;
}

export const TextInputLabel = styled.label<TextInputLabelProps>`
  position: absolute;
  bottom: ${({ isInputFocused, error }) => {
    if (isInputFocused && error) return '55px';
    if (isInputFocused) return '30px';
    if (error) return '30px';
    return '10px';
  }};
  font-size: ${({ theme, isInputFocused, error }) => {
    if (isInputFocused) return theme.fontSize.m;
    if (error) return theme.fontSize.l;
    return theme.fontSize.l;
  }};
  transition: all 0.3s ease-in-out;
`;

interface TextInputFieldProps {
  error?: any;
}

export const TextInputField = styled.input<TextInputFieldProps>`
  border: none;
  border-bottom: 1px solid
    ${({ theme, error }) => (error ? theme.colors.red : theme.colors.black)};
  padding: 0 0 1px;
  height: 37px;
  transition: bottom 0.3s ease-in-out;
  font-size: ${({ theme }) => theme.fontSize.l};

  &:focus {
    outline: none;
  }
`;

export const TextInputErrorLabel = styled.span`
  color: ${({ theme }) => theme.colors.red};
`;
