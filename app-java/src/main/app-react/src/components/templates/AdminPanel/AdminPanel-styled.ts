import styled from 'styled-components';

export const AdminPanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 60px;
  max-width: 1600px;
  position: relative;
`;

export const AdminPanelContent = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  padding: 0 20px;
`;

export const AdminPanelContentHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const AdminPanelContentHeaderTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: bold;
`;

export const AdminPanelContentHeaderDescription = styled.h2`
  margin: 10px 0 0 0;
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: normal;
`;
