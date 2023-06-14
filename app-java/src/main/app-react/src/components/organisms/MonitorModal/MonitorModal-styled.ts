import styled from 'styled-components';

export const MonitorModalContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

export const MonitorModalHeader = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  text-align: center;
  margin: 0px;
`;

export const MonitorModalHeaderColor = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

export const MonitorModalParagraph = styled.p`
  font-size: ${({ theme }) => theme.fontSize.l};
  text-align: center;
`;

export const MonitorModalActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 25px;
  margin: 25px;
`;

export const MonitorModalInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 25%;
`;
