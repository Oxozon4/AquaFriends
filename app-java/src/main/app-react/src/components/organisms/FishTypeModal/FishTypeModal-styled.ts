import styled from 'styled-components';

export const FishTypeModalContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

export const FishTypeModalHeader = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  text-align: center;
  margin: 0px;
`;

export const FishTypeModalHeaderColor = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

export const FishTypeModalParagraph = styled.p`
  font-size: ${({ theme }) => theme.fontSize.l};
  text-align: center;
`;

export const FishTypeModalActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 25px;
  margin: 25px;
`;

export const FishTypeModalInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 25%;
`;

export const FishTypeModalTwoInputs = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
