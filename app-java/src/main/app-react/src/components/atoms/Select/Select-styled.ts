import styled from 'styled-components';

export const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin: 15px 0 10px;
`;

export const StyledSelect = styled.select`
  appearance: none;
  min-width: 100%;
  font-size: ${({ theme }) => theme.fontSize.l};
  padding: 7px 22px 7px 5px;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  -webkit-appearance: none;

  @media ${({ theme }) => theme.breakpoints.sm} {
    min-width: 50%;
  }
`;

export const StyledOption = styled.option`
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const StyledIconWrapper = styled.div`
  position: relative;
  right: 30px;
  top: 3px;
`;
