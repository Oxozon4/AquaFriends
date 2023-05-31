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

export const AdminPanelContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const AdminPanelContentHeader = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.tertiary};
  padding: 15px 0;
`;

export const AdminPanelContentHeaderTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: bold;
  text-align: center;
`;

export const AdminPanelContentHeaderDescription = styled.h2`
  margin: 15px 0 10px;
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: normal;
  text-align: center;
`;

export const AdminPanelContentList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 30px 0;
`;

export const AdminPanelContentListNoItems = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.l};
  text-align: center;
`;
