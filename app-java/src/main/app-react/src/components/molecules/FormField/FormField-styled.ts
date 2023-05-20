import styled from 'styled-components';

export const PasswordInputWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  height: 40px;
  width: 100%;
  padding: 10px 15px 10px 0;
  border-radius: 5px;
`;

export const DarkEyeStyleWrapper = styled.div`
  &:hover {
    opacity: 0.9;
    cursor: pointer;
  }
`;

export const FileButton = styled.label`
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.secondary};
  width: 120px;
  min-width: 80px;
  font-size: 0.8rem;
  height: 32px;
  border-radius: 100px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
`;
