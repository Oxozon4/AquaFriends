import styled from 'styled-components';

export const HeaderWrapperOuter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: fixed;
  z-index: 2;
`;

export const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  width: 100%;
  max-width: 1600px;
  transition: height 300ms;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 1px 5px 0 rgba(96, 96, 96, 0.3);
  z-index: 2;
`;

export const HeaderLogo = styled.a`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  padding: 5px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 5px;
`;

export const HeaderButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeaderButton = styled.button`
  font-size: ${({ theme }) => theme.fontSize.l};
  color: ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.transparent};

  :first-of-type {
    padding-right: 20px;
  }

  &::after {
    content: '';
    width: 0px;
    height: 1px;
    display: block;
    background: ${({ theme }) => theme.colors.black};
    transition: 300ms;
  }

  &:hover::after {
    width: 100%;
  }
`;
