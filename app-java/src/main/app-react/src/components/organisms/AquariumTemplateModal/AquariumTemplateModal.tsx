import { useContext } from 'react';
import { LinksContext } from '../../../providers/LinksProvider';
import { useForm, FormProvider } from 'react-hook-form';
import axios from 'axios';

import Button from '../../atoms/Button/Button';
import Modal from '../../molecules/Modal/Modal';
import FormField from '../../molecules/FormField/FormField';
import { toast } from 'react-toastify';
import {
  AquariumTemplateModalContainer,
  AquariumTemplateModalHeader,
  AquariumTemplateModalHeaderColor,
  AquariumTemplateModalParagraph,
  AquariumTemplateModalActions,
  AquariumTemplateModalInputs,
} from './AquariumTemplateModal-styled';

type aquariumTemplateData = {
  id: number;
  name: string;
  height: number;
  length: number;
  width: number;
  accessories?: any[];
};

interface AquariumTemplateModalProps {
  showModal: boolean;
  setShowModal: (prev: any) => void;
  data: aquariumTemplateData;
  allData: aquariumTemplateData[];
}

const AquariumTemplateModal = ({
  showModal,
  setShowModal,
  data,
}: AquariumTemplateModalProps) => {
  const formMethods = useForm({
    defaultValues: data || {
      name: '',
      height: 0,
      length: 0,
      width: 0,
      accessories: [],
      id: 0,
    },
  });
  const { register, handleSubmit } = formMethods;
  const LinksCtx = useContext(LinksContext);

  const isNewAquariumTemplate = !data || !data.id;

  const onSubmitHandler = async (data: any) => {
    if (!LinksCtx || !LinksCtx.admin || !LinksCtx.admin.saveAccessoryType) {
      return;
    }
    data.id ??= 0;
    data.accessories ??= [];
    if (isNewAquariumTemplate) {
      try {
        await axios.post(LinksCtx.admin.saveAquariumTemplate, data);
        toast.success('Pomyślnie stworzono szablon akwarium!', {
          toastId: 'AquariumTemplateModal',
        });
      } catch {
        toast.error('Wystąpił błąd podczas tworzenia szablonu akwarium!', {
          toastId: 'AquariumTemplateModal',
        });
      }
    } else {
      try {
        await axios.put(
          `${LinksCtx.admin.saveAquariumTemplate}/${data.id}`,
          data
        );
        toast.success('Pomyślnie zaktualizowano szablon akwarium!', {
          toastId: 'AquariumTemplateModal',
        });
      } catch {
        toast.error('Wystąpił błąd podczas aktualizacji szablonu akwarium!', {
          toastId: 'AquariumTemplateModal',
        });
      }
    }

    setShowModal(false);
  };

  const onCreateClickErrorHandler = (error: any) => {
    console.log(error);
  };

  const onAccessoryDeleteHandler = async () => {
    if (!LinksCtx || !LinksCtx.admin || !LinksCtx.admin.saveAquariumTemplate) {
      return;
    }
    try {
      await axios.delete(`${LinksCtx.admin.saveAquariumTemplate}/${data.id}`);
      toast.success('Pomyślnie stworzono akcesorium!', {
        toastId: 'AquariumTemplateModal',
      });
    } catch {
      toast.error('Wystąpił błąd podczas tworzenia akcesorium!', {
        toastId: 'AquariumTemplateModal',
      });
    }
    setShowModal(false);
  };

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <AquariumTemplateModalContainer>
        <AquariumTemplateModalHeader>
          {isNewAquariumTemplate ? 'Zdefiniuj nowy ' : 'Edytuj istniejący '}
          <AquariumTemplateModalHeaderColor>
            szablon akwarium!
          </AquariumTemplateModalHeaderColor>
        </AquariumTemplateModalHeader>
        <AquariumTemplateModalParagraph>
          Uzupełnij poniższe dane.
        </AquariumTemplateModalParagraph>
        <FormProvider {...formMethods}>
          <form
            onSubmit={handleSubmit(onSubmitHandler, onCreateClickErrorHandler)}
          >
            <AquariumTemplateModalInputs>
              <FormField
                type="text"
                title="Nazwa szablonu"
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
              <FormField
                type="text"
                title="Długość akwarium (cm)"
                id="length"
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
                title="Szerokość akwarium (cm)"
                id="width"
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
                title="Wysokość akwarium (cm)"
                id="height"
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
            </AquariumTemplateModalInputs>
            <AquariumTemplateModalActions>
              {!isNewAquariumTemplate && (
                <Button
                  text="Usuń Akcesorium"
                  onClick={onAccessoryDeleteHandler}
                  type="button"
                  variant="danger"
                />
              )}
              <Button
                text={isNewAquariumTemplate ? 'Stwórz' : 'Aktualizuj'}
                type="submit"
              />
            </AquariumTemplateModalActions>
          </form>
        </FormProvider>
      </AquariumTemplateModalContainer>
    </Modal>
  );
};

export default AquariumTemplateModal;
