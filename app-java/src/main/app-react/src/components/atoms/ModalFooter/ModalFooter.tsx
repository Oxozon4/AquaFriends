import {
  TextSpan,
  GreenTextWrapper,
  ModalFooterContainer,
} from './ModalFooter-styled';

const ModalFooter = () => {
  return (
    <ModalFooterContainer>
      <TextSpan>
        &copy;2022 <GreenTextWrapper>B</GreenTextWrapper>ookify
      </TextSpan>
    </ModalFooterContainer>
  );
};

export default ModalFooter;
