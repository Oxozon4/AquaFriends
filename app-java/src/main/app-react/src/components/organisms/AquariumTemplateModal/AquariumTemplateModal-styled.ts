import styled from 'styled-components';

export const AquariumTemplateModalContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

export const AquariumTemplateModalHeader = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  text-align: center;
  margin: 0px;
`;

export const AquariumTemplateModalHeaderColor = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

export const AquariumTemplateModalParagraph = styled.p`
  font-size: ${({ theme }) => theme.fontSize.l};
  text-align: center;
`;

export const AquariumTemplateModalActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 25px;
  margin: 25px;
`;
