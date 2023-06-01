import styled from 'styled-components';

export const AccessoryModalContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

export const AccessoryModalHeader = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  text-align: center;
  margin: 0px;
`;

export const AccessoryModalHeaderColor = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

export const AccessoryModalParagraph = styled.p`
  font-size: ${({ theme }) => theme.fontSize.l};
  text-align: center;
`;

export const AccessoryModalActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 25px;
  margin: 25px;
`;
