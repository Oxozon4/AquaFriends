import Button from '../../atoms/Button/Button';
import Modal from '../../molecules/Modal/Modal';
import {
  FishTypeModalContainer,
  FishTypeModalHeader,
  FishTypeModalHeaderColor,
  FishTypeModalParagraph,
  FishTypeModalActions,
} from './FishTypeModal-styled';

interface FishTypeModalProps {
  showModal: boolean;
  setShowModal: (prev: any) => void;
  fishTypeData: any;
}

const FishTypeModal = ({
  showModal,
  setShowModal,
  fishTypeData,
}: FishTypeModalProps) => {
  const isNewForm = !fishTypeData;

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <FishTypeModalContainer>
        <FishTypeModalHeader>
          {isNewForm ? 'Dodaj nowy ' : 'Edytuj istniejący '}
          <FishTypeModalHeaderColor>gatunek ryb!</FishTypeModalHeaderColor>
        </FishTypeModalHeader>
        <FishTypeModalParagraph>
          Uzupełnij poniższe dane.
        </FishTypeModalParagraph>
        <FishTypeModalActions>
          <Button text={isNewForm ? 'Stwórz' : 'Aktualizuj'} type="submit" />
        </FishTypeModalActions>
      </FishTypeModalContainer>
    </Modal>
  );
};

export default FishTypeModal;
