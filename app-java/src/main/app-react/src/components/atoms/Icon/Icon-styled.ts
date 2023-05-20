import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { FaFacebook, FaGoogle, FaGithub } from 'react-icons/fa';

interface IconProps {
  size: string;
  withhover?: 'false' | 'true';
}

export const CloseIcon = styled(MdClose)<IconProps>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  color: ${({ theme }) => theme.colors.primary};
  border: 2px solid transparent;
  transition: all 300ms;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid
    ${({ theme, withhover }) =>
      withhover === 'true' ? theme.colors.primary : 'transparent'};

  &:hover {
    transform: rotate(90deg);
  }
`;

export const GoogleIcon = styled(FaGoogle)<IconProps>`
  width: 64px;
  height: 64px;
  color: ${({ theme }) => theme.colors.primary};
  transition: all 300ms;
  border-radius: 50%;
  opacity: 1;
  cursor: pointer;

  &:hover {
    opacity: ${({ withhover }) => (withhover === 'true' ? '0.75' : '1')};
  }
`;

export const FacebookIcon = styled(FaFacebook)<IconProps>`
  width: 64px;
  height: 64px;
  color: ${({ theme }) => theme.colors.primary};
  transition: all 300ms;
  border-radius: 50%;
  opacity: 1;
  cursor: pointer;

  &:hover {
    opacity: ${({ withhover }) => (withhover === 'true' ? '0.75' : '1')};
  }
`;

export const GithubIcon = styled(FaGithub)<IconProps>`
  width: 64px;
  height: 64px;
  color: ${({ theme }) => theme.colors.primary};
  transition: all 300ms;
  border-radius: 50%;
  opacity: 1;
  cursor: pointer;

  &:hover {
    opacity: ${({ withhover }) => (withhover === 'true' ? '0.75' : '1')};
  }
`;
