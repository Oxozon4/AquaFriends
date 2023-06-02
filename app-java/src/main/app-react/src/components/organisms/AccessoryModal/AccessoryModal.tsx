import { useContext } from 'react';
import { LinksContext } from '../../../providers/LinksProvider';
import { useForm, FormProvider } from 'react-hook-form';
import axios from 'axios';

import Button from '../../atoms/Button/Button';
import Modal from '../../molecules/Modal/Modal';
import FormField from '../../molecules/FormField/FormField';
import {
  AccessoryModalContainer,
  AccessoryModalHeader,
  AccessoryModalHeaderColor,
  AccessoryModalParagraph,
  AccessoryModalActions,
  AccessoryModalInputs,
} from './AccessoryModal-styled';
import { toast } from 'react-toastify';

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
  const formMethods = useForm({
    defaultValues: data || {
      name: '',
    },
  });
  const { register, handleSubmit } = formMethods;
  const LinksCtx = useContext(LinksContext);

  const isNewAccessory = !data || !data.id;

  const onSubmitHandler = async (data: any) => {
    if (!LinksCtx || !LinksCtx.admin || !LinksCtx.admin.saveAccessoryType) {
      return;
    }
    data.id ??= 0;
    if (isNewAccessory) {
      try {
        axios.post(LinksCtx.admin.saveAccessoryType, data);
        toast.success('Pomyślnie stworzono akcesorium!', {
          toastId: 'AccessoryModal',
        });
      } catch {
        toast.error('Wystąpił błąd podczas tworzenia akcesorium!', {
          toastId: 'AccessoryModal',
        });
      }
    } else {
      try {
        axios.put(`${LinksCtx.admin.saveAccessoryType}/${data.id}`, data);
        toast.success('Pomyślnie zaktualizowano akcesorium!', {
          toastId: 'AccessoryModal',
        });
      } catch {
        toast.error('Wystąpił błąd podczas aktualizacji akcesorium!', {
          toastId: 'AccessoryModal',
        });
      }
    }

    setShowModal(false);
  };

  const onCreateClickErrorHandler = (error: any) => {
    console.log(error);
  };

  const onAccessoryDeleteHandler = () => {
    if (!LinksCtx || !LinksCtx.admin || !LinksCtx.admin.deleteAccessoryType) {
      return;
    }
    try {
      axios.delete(`${LinksCtx.admin.saveAccessoryType}/${data.id}`, data);
      toast.success('Pomyślnie stworzono akcesorium!', {
        toastId: 'AccessoryModal',
      });
    } catch {
      toast.error('Wystąpił błąd podczas tworzenia akcesorium!', {
        toastId: 'AccessoryModal',
      });
    }
    setShowModal(false);
  };

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
        <FormProvider {...formMethods}>
          <form
            onSubmit={handleSubmit(onSubmitHandler, onCreateClickErrorHandler)}
          >
            <AccessoryModalInputs>
              <FormField
                type="text"
                title="Nazwa akcesorium"
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
            </AccessoryModalInputs>

            <AccessoryModalActions>
              {!isNewAccessory && (
                <Button
                  text="Usuń Akcesorium"
                  onClick={onAccessoryDeleteHandler}
                  type="button"
                  variant="danger"
                />
              )}
              <Button
                text={isNewAccessory ? 'Stwórz' : 'Aktualizuj'}
                type="submit"
              />
            </AccessoryModalActions>
          </form>
        </FormProvider>
      </AccessoryModalContainer>
    </Modal>
  );
};

export default AccessoryModal;
