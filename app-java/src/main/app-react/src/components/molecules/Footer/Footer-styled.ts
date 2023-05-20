import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const FooterText = styled.p`
  color: ${({ theme }) => theme.colors.secondary};
`;
