import styled from 'styled-components';

export const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 800px;
  margin: 15px 0 10px;
  position: relative;
`;

interface StyledSelectProps {
  error?: any;
}

export const StyledSelect = styled.select<StyledSelectProps>`
  appearance: none;
  min-width: 100%;
  font-size: ${({ theme }) => theme.fontSize.l};
  padding: 7px 22px 7px 5px;
  border: 1px solid
    ${({ theme, error }) => (error ? theme.colors.danger : theme.colors.black)};
  -webkit-appearance: none;

  @media ${({ theme }) => theme.breakpoints.sm} {
    min-width: 50%;
    margin-left: 32px;
  }
`;

export const StyledOption = styled.option`
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const StyledIconWrapper = styled.div`
  position: absolute;
  right: 3%;
  top: 0px;

  @media ${({ theme }) => theme.breakpoints.sm} {
    right: 23%;
  }
`;

export const StyledErrorMesssage = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.red};
`;
