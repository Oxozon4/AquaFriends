import { useContext } from 'react';
import { LinksContext } from '../../../providers/LinksProvider';
import axios from 'axios';

import Button from '../../atoms/Button/Button';
import Modal from '../../molecules/Modal/Modal';
import { toast } from 'react-toastify';
import {
  ConfirmModalContainer,
  ConfirmModalHeader,
  ConfirmModalHeaderColor,
  ConfirmModalParagraph,
  ConfirmModalActions,
} from './ConfirmModal-styled';

interface ConfirmModalProps {
  showModal: boolean;
  setShowModal: (prev: any) => void;
  data: any;
}

const ConfirmModal = ({ showModal, setShowModal, data }: ConfirmModalProps) => {
  const LinksCtx = useContext(LinksContext);

  const isNewAccessory = !data || !data.id;

  const onSubmitHandler = async (data: any) => {
    if (!LinksCtx || !LinksCtx.admin || !LinksCtx.admin.saveAccessoryType) {
      return;
    }
    data.id ??= 0;
    if (isNewAccessory) {
      try {
        await axios.post(LinksCtx.admin.saveAccessoryType, data);
        toast.success('Pomyślnie stworzono akcesorium!', {
          toastId: 'ConfirmModal',
        });
      } catch {
        toast.error('Wystąpił błąd podczas tworzenia akcesorium!', {
          toastId: 'ConfirmModal',
        });
      }
    } else {
      try {
        await axios.put(`${LinksCtx.admin.saveAccessoryType}/${data.id}`, data);
        toast.success('Pomyślnie zaktualizowano akcesorium!', {
          toastId: 'ConfirmModal',
        });
      } catch {
        toast.error('Wystąpił błąd podczas aktualizacji akcesorium!', {
          toastId: 'ConfirmModal',
        });
      }
    }

    setShowModal(false);
  };

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <ConfirmModalContainer>
        <ConfirmModalHeader>
          Czy na pewno chcesz usunąć to
          <ConfirmModalHeaderColor>akwarium?</ConfirmModalHeaderColor>
        </ConfirmModalHeader>
        <ConfirmModalParagraph>
          Tej akcji nie można cofnąć.
        </ConfirmModalParagraph>
        <ConfirmModalActions>
          <Button text="Nie" />
          <Button text="Tak" variant="danger" />
        </ConfirmModalActions>
      </ConfirmModalContainer>
    </Modal>
  );
};

export default ConfirmModal;
