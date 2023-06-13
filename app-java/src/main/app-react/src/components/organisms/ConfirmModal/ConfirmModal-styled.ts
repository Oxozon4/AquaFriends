import styled from 'styled-components';

export const ConfirmModalContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

export const ConfirmModalHeader = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  text-align: center;
  margin: 0px;
`;

export const ConfirmModalHeaderColor = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

export const ConfirmModalParagraph = styled.p`
  font-size: ${({ theme }) => theme.fontSize.l};
  text-align: center;
`;

export const ConfirmModalActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 25px;
  margin: 25px;
`;

export const ConfirmModalInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 25%;
`;
