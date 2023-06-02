import styled from 'styled-components';

export const DecoratorModalContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

export const DecoratorModalHeader = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  text-align: center;
  margin: 0px;
`;

export const DecoratorModalHeaderColor = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

export const DecoratorModalParagraph = styled.p`
  font-size: ${({ theme }) => theme.fontSize.l};
  text-align: center;
`;

export const DecoratorModalActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 25px;
  margin: 25px;
`;

export const DecoratorModalInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 25%;
`;
