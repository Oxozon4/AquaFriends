import styled from 'styled-components';

interface StyledProgressBarProps {
  activeStep: number;
  stepsNumber: number;
}

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 3px;
  background: ${({ theme }) => theme.colors.tertiary};
`;

export const StyledProgressBar = styled.div<StyledProgressBarProps>`
  width: ${({ activeStep, stepsNumber }) =>
    `${((activeStep + 1) / stepsNumber) * 100}%`};
  background: ${({ theme }) => theme.colors.primary};
  height: 3px;
  max-width: 100%;
`;
