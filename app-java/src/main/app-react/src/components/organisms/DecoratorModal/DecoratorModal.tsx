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
  data: any;
}

const DecoratorModal = ({
  showModal,
  setShowModal,
  data,
}: DecoratorModalProps) => {
  const isNewDecorator = !data || !data.length;

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <DecoratorModalContainer>
        <DecoratorModalHeader>
          {isNewDecorator ? 'Zdefiniuj nowy ' : 'Edytuj istniejący '}
          <DecoratorModalHeaderColor>dekorator!</DecoratorModalHeaderColor>
        </DecoratorModalHeader>
        <DecoratorModalParagraph>
          Uzupełnij poniższe dane.
        </DecoratorModalParagraph>
        <DecoratorModalActions>
          <Button
            text={isNewDecorator ? 'Stwórz' : 'Aktualizuj'}
            type="submit"
          />
        </DecoratorModalActions>
      </DecoratorModalContainer>
    </Modal>
  );
};

export default DecoratorModal;
