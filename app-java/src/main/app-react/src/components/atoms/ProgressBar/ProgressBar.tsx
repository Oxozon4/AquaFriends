import { ProgressBarContainer, StyledProgressBar } from './ProgressBar-styled';

interface ProgressBarProps {
  activeStep: number;
  stepsNumber: number;
}

const ProgressBar = ({ activeStep, stepsNumber }: ProgressBarProps) => {
  return (
    <ProgressBarContainer>
      <StyledProgressBar activeStep={activeStep} stepsNumber={stepsNumber} />
    </ProgressBarContainer>
  );
};

export default ProgressBar;
