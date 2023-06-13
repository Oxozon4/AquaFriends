import { useContext } from 'react';
import { LinksContext } from '../../../providers/LinksProvider';
import { useForm, FormProvider } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';

import Button from '../../atoms/Button/Button';
import Modal from '../../molecules/Modal/Modal';
import {
  DecoratorModalContainer,
  DecoratorModalHeader,
  DecoratorModalHeaderColor,
  DecoratorModalParagraph,
  DecoratorModalActions,
  DecoratorModalInputs,
} from './DecoratorModal-styled';
import FormField from '../../molecules/FormField/FormField';

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
  const formMethods = useForm({
    defaultValues: data || {
      name: '',
      type: 'DECORATION',
      id: 0,
    },
  });
  const { register, handleSubmit } = formMethods;
  const LinksCtx = useContext(LinksContext);

  const isNewDecorator = !data || !data.id;

  const onSubmitHandler = async (data: any) => {
    if (!LinksCtx || !LinksCtx.admin || !LinksCtx.admin.saveAccessoryType) {
      return;
    }
    data.id ??= 0;
    data.type ??= 'DECORATION';
    if (isNewDecorator) {
      try {
        await axios.post(LinksCtx.admin.saveDecoratorType, data);
        toast.success('Pomyślnie stworzono dekorator!', {
          toastId: 'AccessoryModal',
        });
      } catch {
        toast.error('Wystąpił błąd podczas tworzenia dekoratora!', {
          toastId: 'AccessoryModal',
        });
      }
    } else {
      try {
        await axios.put(`${LinksCtx.admin.saveDecoratorType}/${data.id}`, data);
        toast.success('Pomyślnie zaktualizowano dekorator!', {
          toastId: 'AccessoryModal',
        });
      } catch {
        toast.error('Wystąpił błąd podczas aktualizacji dekoratora!', {
          toastId: 'AccessoryModal',
        });
      }
    }

    setShowModal(false);
  };

  const onCreateClickErrorHandler = (error: any) => {
    console.log(error);
  };

  const onDecoratorDeleteHandler = async () => {
    if (!LinksCtx || !LinksCtx.admin || !LinksCtx.admin.deleteDecoratorType) {
      return;
    }
    try {
      await axios.delete(`${LinksCtx.admin.saveDecoratorType}/${data.id}`);
      toast.success('Pomyślnie stworzono dekorator!', {
        toastId: 'AccessoryModal',
      });
    } catch {
      toast.error('Wystąpił błąd podczas tworzenia dekoratora!', {
        toastId: 'AccessoryModal',
      });
    }
    setShowModal(false);
  };

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
        <FormProvider {...formMethods}>
          <form
            onSubmit={handleSubmit(onSubmitHandler, onCreateClickErrorHandler)}
          >
            <DecoratorModalInputs>
              <FormField
                type="text"
                title="Nazwa dekoracji"
                id="name"
                register={register}
                validators={{
                  required: {
                    value: true,
                    message: 'To pole jest wymagane!',
                  },
                  maxLength: {
                    value: 60,
                    message: 'To pole może zawierać maksymalnie 35 znaków!',
                  },
                }}
              />
            </DecoratorModalInputs>
            <DecoratorModalActions>
              {!isNewDecorator && (
                <Button
                  text="Usuń dekorator"
                  onClick={onDecoratorDeleteHandler}
                  type="button"
                  variant="danger"
                />
              )}
              <Button
                text={isNewDecorator ? 'Stwórz' : 'Aktualizuj'}
                type="submit"
              />
            </DecoratorModalActions>
          </form>
        </FormProvider>
      </DecoratorModalContainer>
    </Modal>
  );
};

export default DecoratorModal;
