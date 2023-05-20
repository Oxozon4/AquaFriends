import styled from 'styled-components';

export const ModalFooterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
  padding: 10px;
  margin: 10px 0 5px 0;
`;

export const GreenTextWrapper = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

export const TextSpan = styled.span`
  letter-spacing: 0.08em;
  padding: 0 15px;
  text-align: justify;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.m};
`;
