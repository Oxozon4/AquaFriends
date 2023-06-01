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
  knowledgeBaseData: any;
}

const KnowledgeBaseModal = ({
  showModal,
  setShowModal,
  knowledgeBaseData,
}: KnowledgeBaseModalProps) => {
  const isNewForm = !knowledgeBaseData;

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <KnowledgeBaseModalContainer>
        <KnowledgeBaseModalHeader>
          {isNewForm ? 'Dodaj nowy ' : 'Edytuj istniejący '}
          <KnowledgeBaseModalHeaderColor>
            gatunek ryb!
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
