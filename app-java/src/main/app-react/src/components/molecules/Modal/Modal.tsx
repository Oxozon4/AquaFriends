import { useRef, useEffect, useCallback } from 'react';
import {
  Background,
  ModalWrapper,
  ModalContent,
  CloseModalButton,
} from './Modal-styled.js';

interface ModalProps {
  showModal: boolean;
  setShowModal: (prev: any) => void;
  children: React.ReactNode;
}

const Modal = ({ showModal, setShowModal, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const closeModal = (e: any) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    (e: any) => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => {
      document.removeEventListener('keydown', keyPress);
    };
  });

  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <ModalWrapper>
            <ModalContent>{children}</ModalContent>
            <CloseModalButton
              aria-label="close modal"
              onClick={() => setShowModal((prev: any) => !prev)}
            />
          </ModalWrapper>
        </Background>
      ) : null}
    </>
  );
};

export default Modal;
