import styled from 'styled-components';

export const ToastContentWrapper = styled.div`
  position: fixed;
  top: 1em;
  right: 2em;
  width: 360px;
  display: flex;
  flex-direction: row;
  padding: 8px;
  border: 1px solid transparent;
  border-radius: 4px;
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 2px 15px 0 rgba(0, 0, 0, 0.05);
  overflow: hidden;
  z-index: 11;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const ToatContentIconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ToastContentMainWrapper = styled.div`
  width: 100%;
  padding: 0 15px 0 15px;
`;

export const ToastContentTitle = styled.span``;

export const ToastContentFooter = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  padding: 0 15px 0 15px;
  gap: 10px;
`;

export const ToastContentRemaining = styled.span``;
