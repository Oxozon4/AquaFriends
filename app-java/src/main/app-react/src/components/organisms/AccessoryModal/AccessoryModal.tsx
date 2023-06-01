import Button from '../../atoms/Button/Button';
import Modal from '../../molecules/Modal/Modal';
import {
  AccessoryModalContainer,
  AccessoryModalHeader,
  AccessoryModalHeaderColor,
  AccessoryModalParagraph,
  AccessoryModalActions,
} from './AccessoryModal-styled';

interface AccessoryModalProps {
  showModal: boolean;
  setShowModal: (prev: any) => void;
  accessoryData: any;
}

const AccessoryModal = ({
  showModal,
  setShowModal,
  accessoryData,
}: AccessoryModalProps) => {
  const isNewForm = !accessoryData;

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <AccessoryModalContainer>
        <AccessoryModalHeader>
          {isNewForm ? 'Dodaj nowy ' : 'Edytuj istniejący '}
          <AccessoryModalHeaderColor>
            rodzaj akcesorium!
          </AccessoryModalHeaderColor>
        </AccessoryModalHeader>
        <AccessoryModalParagraph>
          Uzupełnij poniższe dane.
        </AccessoryModalParagraph>
        <AccessoryModalActions>
          <Button text={isNewForm ? 'Stwórz' : 'Aktualizuj'} type="submit" />
        </AccessoryModalActions>
      </AccessoryModalContainer>
    </Modal>
  );
};

export default AccessoryModal;
