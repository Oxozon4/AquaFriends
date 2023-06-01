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
  data: any;
}

const AquariumTemplateModal = ({
  showModal,
  setShowModal,
  data,
}: AquariumTemplateModalProps) => {
  const isNewAquariumTemplate = !data || !data.length;

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <AquariumTemplateModalContainer>
        <AquariumTemplateModalHeader>
          {isNewAquariumTemplate ? 'Zdefiniuj nowe ' : 'Edytuj istniejące '}
          <AquariumTemplateModalHeaderColor>
            gotowe akwarium!
          </AquariumTemplateModalHeaderColor>
        </AquariumTemplateModalHeader>
        <AquariumTemplateModalParagraph>
          Uzupełnij poniższe dane.
        </AquariumTemplateModalParagraph>
        <AquariumTemplateModalActions>
          <Button
            text={isNewAquariumTemplate ? 'Stwórz' : 'Aktualizuj'}
            type="submit"
          />
        </AquariumTemplateModalActions>
      </AquariumTemplateModalContainer>
    </Modal>
  );
};

export default AquariumTemplateModal;
