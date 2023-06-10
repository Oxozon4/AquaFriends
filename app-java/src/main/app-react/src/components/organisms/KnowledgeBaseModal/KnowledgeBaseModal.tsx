import { useContext } from 'react';
import { LinksContext } from '../../../providers/LinksProvider';
import { useForm, FormProvider } from 'react-hook-form';
import axios from 'axios';

import FormField from '../../molecules/FormField/FormField';
import Select from '../../atoms/Select/Select';
import Button from '../../atoms/Button/Button';
import Modal from '../../molecules/Modal/Modal';
import { toast } from 'react-toastify';
import {
  KnowledgeBaseModalContainer,
  KnowledgeBaseModalHeader,
  KnowledgeBaseModalHeaderColor,
  KnowledgeBaseModalParagraph,
  KnowledgeBaseModalActions,
  KnowledgeBaseModalInputs,
  KnowledgeBaseModalTwoInputs,
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
  const formMethods = useForm({
    defaultValues: data || {
      name: '',
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formMethods;
  const LinksCtx = useContext(LinksContext);

  const isNewKnowledgeBase = !data || !data.id;
  const selectComponentOptions = [
    {
      label: 'Twardość ogólna (GH)',
      value: 'GH',
    },
    {
      label: 'Twardość węglanowa (KH)',
      value: 'KH',
    },
    {
      label: 'Azotany (NO2)',
      value: 'NO2',
    },
    {
      label: 'Azotany (NO3)',
      value: 'NO3',
    },
    {
      label: 'Kwasowość (PH)',
      value: 'PH',
    },
  ];

  const onSubmitHandler = async (data: any) => {
    if (!LinksCtx || !LinksCtx.admin || !LinksCtx.admin.saveKnowledge) {
      return;
    }
    data.id ??= 0;
    if (isNewKnowledgeBase) {
      try {
        await axios.post(LinksCtx.admin.saveKnowledge, data);
        toast.success('Pomyślnie stworzono akcesorium!', {
          toastId: 'KnowledgeBaseModal',
        });
      } catch {
        toast.error('Wystąpił błąd podczas tworzenia akcesorium!', {
          toastId: 'KnowledgeBaseModal',
        });
      }
    } else {
      try {
        await axios.put(`${LinksCtx.admin.saveKnowledge}/${data.id}`, data);
        toast.success('Pomyślnie zaktualizowano akcesorium!', {
          toastId: 'KnowledgeBaseModal',
        });
      } catch {
        toast.error('Wystąpił błąd podczas aktualizacji akcesorium!', {
          toastId: 'KnowledgeBaseModal',
        });
      }
    }

    setShowModal(false);
  };

  const onCreateClickErrorHandler = (error: any) => {
    console.log(error);
  };

  const onKnowledgeBaseDeleteHandler = () => {
    if (!LinksCtx || !LinksCtx.admin || !LinksCtx.admin.saveKnowledge) {
      return;
    }
    try {
      axios.delete(`${LinksCtx.admin.saveKnowledge}/${data.id}`, data);
      toast.success('Pomyślnie stworzono akcesorium!', {
        toastId: 'KnowledgeBaseModal',
      });
    } catch {
      toast.error('Wystąpił błąd podczas tworzenia akcesorium!', {
        toastId: 'KnowledgeBaseModal',
      });
    }
    setShowModal(false);
  };

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <KnowledgeBaseModalContainer>
        <KnowledgeBaseModalHeader>
          {isNewKnowledgeBase ? 'Dodaj nową ' : 'Edytuj istniejącą '}
          <KnowledgeBaseModalHeaderColor>
            podpowiedź!
          </KnowledgeBaseModalHeaderColor>
        </KnowledgeBaseModalHeader>
        <KnowledgeBaseModalParagraph>
          Uzupełnij poniższe dane.
        </KnowledgeBaseModalParagraph>
        <FormProvider {...formMethods}>
          <form
            onSubmit={handleSubmit(onSubmitHandler, onCreateClickErrorHandler)}
          >
            <KnowledgeBaseModalInputs>
              <FormField
                type="text"
                title="Treść podpowiedzi"
                id="info"
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
              <Select
                options={selectComponentOptions}
                register={register}
                id="problemType"
                validators={{}}
                error={errors}
              />
              <KnowledgeBaseModalTwoInputs>
                <FormField
                  type="text"
                  title="Minimalna wartość"
                  id="min"
                  register={register}
                  validators={{
                    required: {
                      value: true,
                      message: 'To pole jest wymagane!',
                    },
                    valueAsNumber: {
                      value: true,
                      message: 'To pole musi być liczbą!',
                    },
                  }}
                />
                <FormField
                  type="text"
                  title="Maksymalna wartość"
                  id="max"
                  register={register}
                  validators={{
                    required: {
                      value: true,
                      message: 'To pole jest wymagane!',
                    },
                    valueAsNumber: {
                      value: true,
                      message: 'To pole musi być liczbą!',
                    },
                  }}
                />
              </KnowledgeBaseModalTwoInputs>
            </KnowledgeBaseModalInputs>
            <KnowledgeBaseModalActions>
              {!isNewKnowledgeBase && (
                <Button
                  text="Usuń Akcesorium"
                  onClick={onKnowledgeBaseDeleteHandler}
                  type="button"
                  variant="danger"
                />
              )}
              <Button
                text={isNewKnowledgeBase ? 'Stwórz' : 'Aktualizuj'}
                type="submit"
              />
            </KnowledgeBaseModalActions>
          </form>
        </FormProvider>
      </KnowledgeBaseModalContainer>
    </Modal>
  );
};

export default KnowledgeBaseModal;
