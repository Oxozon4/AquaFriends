import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding: 0 40px;
  position: fixed;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.s};
  height: 30px;
  width: 100%;
`;

export const GreenTextWrapper = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

export const About = styled.span`
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primary};
  }
`;
