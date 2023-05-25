import styled from 'styled-components';

export const ListItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.tertiary};
  width: 100%;
  margin-bottom: 20px;
  padding: 15px;
`;

export const ListItemContent = styled.div`
  width: 50%;
`;

export const ListItemContentTitle = styled.h3`
  margin: 0px;
`;

export const ListItemContentDescription = styled.ul`
  margin-top: 5px;
  padding-left: 25px;
`;

export const ListItemContentDescriptionItem = styled.li`
  font-size: ${({ theme }) => theme.fontSize.m};
`;

export const ListItemActions = styled.div`
  width: 50%;
  text-align: right;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const ListItemActionsDescriptionWrapper = styled.div`
  width: 100%;
`;

export const ListItemActionsDescription = styled.p`
  margin: 0px 0px 10px 0px;
  font-size: ${({ theme }) => theme.fontSize.m};
`;

export const ListItemActionsButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 5px;

  @media ${({ theme }) => theme.breakpoints.sm} {
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
`;
