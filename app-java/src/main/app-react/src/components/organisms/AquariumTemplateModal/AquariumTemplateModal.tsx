import Button from '../../atoms/Button/Button';
import Modal from '../../molecules/Modal/Modal';
import {
  AquariumTemplateModalContainer,
  AquariumTemplateModalHeader,
  AquariumTemplateModalHeaderColor,
  AquariumTemplateModalParagraph,
  AquariumTemplateModalActions,
} from './AquariumTemplateModal-styled';

interface AquariumTemplateModalProps {
  showModal: boolean;
  setShowModal: (prev: any) => void;
  aquariumTemplateData: any;
}

const AquariumTemplateModal = ({
  showModal,
  setShowModal,
  aquariumTemplateData,
}: AquariumTemplateModalProps) => {
  const isNewForm = !aquariumTemplateData;

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <AquariumTemplateModalContainer>
        <AquariumTemplateModalHeader>
          {isNewForm ? 'Zdefiniuj nowe ' : 'Edytuj istniejące '}
          <AquariumTemplateModalHeaderColor>
            gotowe akwarium!
          </AquariumTemplateModalHeaderColor>
        </AquariumTemplateModalHeader>
        <AquariumTemplateModalParagraph>
          Uzupełnij poniższe dane.
        </AquariumTemplateModalParagraph>
        <AquariumTemplateModalActions>
          <Button text={isNewForm ? 'Stwórz' : 'Aktualizuj'} type="submit" />
        </AquariumTemplateModalActions>
      </AquariumTemplateModalContainer>
    </Modal>
  );
};

export default AquariumTemplateModal;
