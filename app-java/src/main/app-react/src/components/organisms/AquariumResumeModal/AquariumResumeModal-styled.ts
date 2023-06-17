import styled from 'styled-components';

export const AquariumResumeModalContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

export const AquariumResumeModalHeader = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  text-align: center;
  margin: 0px;
`;

export const AquariumResumeModalHeaderColor = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

export const AquariumResumeModalActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 25px;
  margin: 25px;
`;

export const AquariumResumeModalInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 25%;
`;
