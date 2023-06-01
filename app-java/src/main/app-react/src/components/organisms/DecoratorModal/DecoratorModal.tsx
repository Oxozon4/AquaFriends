import Button from '../../atoms/Button/Button';
import Modal from '../../molecules/Modal/Modal';
import {
  DecoratorModalContainer,
  DecoratorModalHeader,
  DecoratorModalHeaderColor,
  DecoratorModalParagraph,
  DecoratorModalActions,
} from './DecoratorModal-styled';

interface DecoratorModalProps {
  showModal: boolean;
  setShowModal: (prev: any) => void;
  aquariumTemplateData: any;
}

const DecoratorModal = ({
  showModal,
  setShowModal,
  aquariumTemplateData,
}: DecoratorModalProps) => {
  const isNewForm = !aquariumTemplateData;

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <DecoratorModalContainer>
        <DecoratorModalHeader>
          {isNewForm ? 'Zdefiniuj nowe ' : 'Edytuj istniejące '}
          <DecoratorModalHeaderColor>
            gotowe akwarium!
          </DecoratorModalHeaderColor>
        </DecoratorModalHeader>
        <DecoratorModalParagraph>
          Uzupełnij poniższe dane.
        </DecoratorModalParagraph>
        <DecoratorModalActions>
          <Button text={isNewForm ? 'Stwórz' : 'Aktualizuj'} type="submit" />
        </DecoratorModalActions>
      </DecoratorModalContainer>
    </Modal>
  );
};

export default DecoratorModal;
