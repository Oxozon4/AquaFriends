import styled from 'styled-components';
import { MdExitToApp } from 'react-icons/md';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  box-shadow: 0px 0px 45px rgba(0, 0, 0, 0.1);
  font-size: ${({ theme }) => theme.fontSize.m};
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Header = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 0 10px;
  width: 100%;
  height: 120px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.white};
  border-radius: none;

  @media ${({ theme }) => theme.breakpoints.md} {
    border-bottom: initial;
    border-radius: 0px 0px 30px 30px;
    padding: 0 30px;
  }
`;

export const Logo = styled.span`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.logo};
  font-weight: 700; //raczej wrzuca 600 nie 700; dodać w theme?
  letter-spacing: 0.02em; //dodać w theme?
  &::first-letter {
    color: ${({ theme }) => theme.colors.primary};
  }
  &:hover {
    cursor: pointer;
  }
`;

export const IconStyleWrapper = styled.div`
  &:hover {
    opacity: 0.9;
    cursor: pointer;
  }
`;

export const IconExit = styled(MdExitToApp)`
  color: ${({ theme }) => theme.colors.white};
  position: absolute;
  right: 50px;
  font-size: 2rem;
  transform: scale(1.5);
  color: #fff;
  &:hover {
    opacity: 0.9;
    cursor: pointer;
  }
`;
