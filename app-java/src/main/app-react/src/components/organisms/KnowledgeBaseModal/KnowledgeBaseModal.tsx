import Button from '../../atoms/Button/Button';
import Modal from '../../molecules/Modal/Modal';
import {
  KnowledgeBaseModalContainer,
  KnowledgeBaseModalHeader,
  KnowledgeBaseModalHeaderColor,
  KnowledgeBaseModalParagraph,
  KnowledgeBaseModalActions,
} from './KnowledgeBaseModal-styled';

interface KnowledgeBaseModalProps {
  showModal: boolean;
  setShowModal: (prev: any) => void;
  data: any;
}

const KnowledgeBaseModal = ({
  showModal,
  setShowModal,
  data,
}: KnowledgeBaseModalProps) => {
  const isNewForm = !data;

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <KnowledgeBaseModalContainer>
        <KnowledgeBaseModalHeader>
          {isNewForm ? 'Dodaj nową ' : 'Edytuj istniejącą '}
          <KnowledgeBaseModalHeaderColor>
            podpowiedź!
          </KnowledgeBaseModalHeaderColor>
        </KnowledgeBaseModalHeader>
        <KnowledgeBaseModalParagraph>
          Uzupełnij poniższe dane.
        </KnowledgeBaseModalParagraph>
        <KnowledgeBaseModalActions>
          <Button text={isNewForm ? 'Stwórz' : 'Aktualizuj'} type="submit" />
        </KnowledgeBaseModalActions>
      </KnowledgeBaseModalContainer>
    </Modal>
  );
};

export default KnowledgeBaseModal;
