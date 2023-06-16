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
  id: number;
}

const ConfirmModal = ({ showModal, setShowModal, id }: ConfirmModalProps) => {
  const LinksCtx = useContext(LinksContext);
  id ??= 0;

  const onSubmitHandler = async (data: any) => {
    if (!LinksCtx || !LinksCtx.user || !LinksCtx.user.saveAquarium) {
      return;
    }
    data.id ??= 0;

    try {
      await axios.delete(`${LinksCtx.user.saveAquarium}/${id}`);
      toast.success('Pomyślnie usunięto akwarium!', {
        toastId: 'ConfirmModal',
      });
    } catch {
      toast.error('Wystąpił błąd podczas usuwania akwarium!', {
        toastId: 'ConfirmModal',
      });
    }

    setShowModal(false);
  };

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <ConfirmModalContainer>
        <ConfirmModalHeader>
          Czy na pewno chcesz usunąć
          <ConfirmModalHeaderColor> akwarium?</ConfirmModalHeaderColor>
        </ConfirmModalHeader>
        <ConfirmModalParagraph>
          Tej akcji nie można cofnąć.
        </ConfirmModalParagraph>
        <ConfirmModalActions>
          <Button text="Nie" onClick={() => setShowModal(false)} />
          <Button text="Tak" variant="danger" onClick={onSubmitHandler} />
        </ConfirmModalActions>
      </ConfirmModalContainer>
    </Modal>
  );
};

export default ConfirmModal;
