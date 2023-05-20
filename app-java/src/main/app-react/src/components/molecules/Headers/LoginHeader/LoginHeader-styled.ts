import styled from 'styled-components';

interface HeaderButtonsProps {
  isScrolled: boolean;
}

export const HeaderWrapperOuter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: fixed;
  z-index: 2;
`;

export const HeaderWrapper = styled.div<HeaderButtonsProps>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  width: 100%;
  max-width: 1600px;
  transition: height 300ms;
  z-index: 2;
  height: ${({ isScrolled }) => (isScrolled ? '60px' : '80px')};
  background-color: ${({ theme, isScrolled }) =>
    isScrolled ? theme.colors.white : theme.colors.transparent};
  box-shadow: ${({ isScrolled }) =>
    isScrolled ? `0 1px 5px 0 rgba(96, 96, 96, 0.3)` : 'none'};

  @media ${({ theme }) => theme.breakpoints.sm} {
    padding: 0 2rem;
  }
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

export const HeaderButton = styled.button<HeaderButtonsProps>`
  font-size: ${({ theme }) => theme.fontSize.l};
  color: ${({ theme, isScrolled }) =>
    isScrolled ? theme.colors.black : theme.colors.secondary};
  background-color: ${({ theme }) => theme.colors.transparent};

  :first-of-type {
    padding-right: 20px;
  }

  &::after {
    content: '';
    width: 0px;
    height: 1px;
    display: block;
    background: ${({ theme, isScrolled }) =>
      isScrolled ? theme.colors.black : theme.colors.secondary};
    transition: 300ms;
  }

  &:hover::after {
    width: 100%;
  }
`;
