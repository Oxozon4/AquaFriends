import styled from 'styled-components';

export const Input = styled.input`
  font-size: 1rem;
  background-color: ${({ theme }) => theme.colors.white};
  margin: 0;
  height: 40px;
  width: 100%;
  max-width: 100%;
  padding: 10px 25px;
  border: none;
  border-radius: 5px;
  ${({ type }) => type === 'checkbox' && `
    width: 24px; 
    margin: 10px 0;
    accent-color: #1ED760;
    `};
  ${({ type }) => type === 'file' && `display: none;`};
  ::placeholder {
    color: ${({ theme }) => theme.colors.placeholder};
    font-size: ${({ theme }) => theme.fontSize.m};
    letter-spacing: 0.08em;
  }
  &:focus {
    outline: none;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  max-width: 500px;
  height: 100px;
  font-size: 1rem;
  padding: 5px 8px;
  border: 1px solid ${({ theme }) => theme.colors.white};
  box-sizing: border-box;
  box-shadow: -2px 4px 10px rgba(115, 124, 142, 0.09);
  border-radius: 5px;

  &:focus {
    outline: none;
    box-shadow: -2px 4px 10px rgba(115, 124, 142, 0.3);
  }
`;
