import styled from 'styled-components';

export const LoginModalContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

export const LoginModalHeader = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  margin: 0px;
`;

export const LoginModalParagraph = styled.p`
  @media ${({ theme }) => theme.breakpoints.xs} {
    padding: 0 20px;
    margin: 20px 0 0;
    text-align: center;
  }
`;

export const LoginModalForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20px 0px;
  width: 50%;
  @media ${({ theme }) => theme.breakpoints.xs} {
    width: 100%;
    padding: 0 20px;
  }
`;

export const LoginModalDivider = styled.div`
  width: 50%;
  min-width: 300px;
  display: flex;
  flex-direction: row;
  margin: 20px 0 0;

  @media ${({ theme }) => theme.breakpoints.xs} {
    width: 100%;
    padding: 0 20px;
  }
`;

export const LoginModalLine = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.black};
  width: 40%;
  margin: 20px 30px 0px;
`;

export const LoginModalDividerText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xl};
`;

export const LoginModalIconsWrapper = styled.div`
  width: 50%;
  min-width: 300px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 50px 0;
  @media ${({ theme }) => theme.breakpoints.xs} {
    width: 100%;
    padding: 0 20px;
  }
`;

export const LoginModalFooter = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media ${({ theme }) => theme.breakpoints.xs} {
    flex-direction: column;
  }
`;

export const LoginModalFooterButtonsWrapper = styled.span`
  display: flex;
  flex-direction: column;
`;

export const LoginModalFooterButtonLabel = styled.span``;

export const LoginModalFooterButton = styled.a`
  font-size: ${({ theme }) => theme.fontSize.xl};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.black};
  transition: all 300ms;

  :hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const LoginModalFooterLegalNote = styled.p`
  place-self: flex-end;

  @media ${({ theme }) => theme.breakpoints.xs} {
    place-self: unset;
  }
`;
