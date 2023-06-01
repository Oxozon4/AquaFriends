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
  data: any;
}

const AccessoryModal = ({
  showModal,
  setShowModal,
  data,
}: AccessoryModalProps) => {
  const isNewAccessory = !data;

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <AccessoryModalContainer>
        <AccessoryModalHeader>
          {isNewAccessory ? 'Dodaj nowy ' : 'Edytuj istniejący '}
          <AccessoryModalHeaderColor>
            rodzaj akcesorium!
          </AccessoryModalHeaderColor>
        </AccessoryModalHeader>
        <AccessoryModalParagraph>
          Uzupełnij poniższe dane.
        </AccessoryModalParagraph>
        <AccessoryModalActions>
          <Button
            text={isNewAccessory ? 'Stwórz' : 'Aktualizuj'}
            type="submit"
          />
        </AccessoryModalActions>
      </AccessoryModalContainer>
    </Modal>
  );
};

export default AccessoryModal;
