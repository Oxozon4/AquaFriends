import styled from 'styled-components';

export const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 60px;
  max-width: 1600px;
  position: relative;
`;

export const DashboardContentHeader = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.tertiary};
  padding: 15px 0;
`;

export const DashboardContentHeaderTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: bold;
  text-align: center;
`;

export const DashboardContentHeaderDescription = styled.h2`
  margin: 15px 0 10px;
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: normal;
  text-align: center;
`;
