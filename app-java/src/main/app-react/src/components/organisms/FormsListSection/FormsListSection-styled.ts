import styled from 'styled-components';

export const FormsListSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary};
  margin: 20px 0;

  padding: 0 25px;

  @media ${({ theme }) => theme.breakpoints.sm} {
    padding: 0 50px;
  }
`;

export const FormsListSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
`;

export const FormsListSectionHeaderTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xl};
`;

export const FormsListSectionContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
