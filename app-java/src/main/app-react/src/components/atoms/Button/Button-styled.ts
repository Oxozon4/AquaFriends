import styled from 'styled-components';

interface StyledButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'copy';
  type?: 'button' | 'reset' | 'submit' | undefined;
}

export const PrimaryButton = styled.button<StyledButtonProps>`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-weight: bold;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 5px;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const SecondaryButton = styled.button<StyledButtonProps>`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  border: 2px solid ${({ theme }) => theme.colors.tertiary};
  border-radius: 5px;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const DangerButton = styled.button<StyledButtonProps>`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.danger};
  font-weight: bold;
  border: 2px solid red;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.danger};
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const CopyButton = styled.button<StyledButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  padding: 10px 15px;
  background-color: ${({ theme }) => theme.colors.tertiary};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  border: 2px solid ${({ theme }) => theme.colors.tertiary};
  border-radius: 5px;
  transition: all 0.3s ease-in-out;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.success};

    outline: none;
  }
`;
