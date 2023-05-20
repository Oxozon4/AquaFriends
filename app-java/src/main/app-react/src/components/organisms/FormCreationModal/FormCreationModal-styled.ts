import styled from 'styled-components';

export const FormCreationModalContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

export const FormCreationModalHeader = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  text-align: center;
  margin: 0px;
`;

export const FormCreationModalHeaderColor = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

export const FormCreationModalParagraph = styled.p`
  font-size: ${({ theme }) => theme.fontSize.l};
  text-align: center;
`;

export const FormCreationModalActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 25px;
  margin: 25px;
`;

export const FormCreationModalCreateSection = styled.div`
  margin: 20px 20px 8px;

  @media ${({ theme }) => theme.breakpoints.sm} {
    margin: 20px 40px 15px;
  }

  @media ${({ theme }) => theme.breakpoints.md} {
    margin: 20px 75px 30px;
  }
`;
