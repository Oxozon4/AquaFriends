import React from 'react';
import { TextSpan, GreenTextWrapper, ModalFooterContainer } from './ModalFooter-styled';
import '@fontsource/montserrat';

const ModalFooter = () => {
  return (
    <>
      <ModalFooterContainer>
        <TextSpan>
          &copy;2022 <GreenTextWrapper>B</GreenTextWrapper>ookify
        </TextSpan>
      </ModalFooterContainer>
    </>
  );
};

export default ModalFooter;
