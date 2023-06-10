import { useContext } from 'react';
import { LinksContext } from '../../../providers/LinksProvider';
import { useForm, FormProvider } from 'react-hook-form';
import axios from 'axios';

import Button from '../../atoms/Button/Button';
import Modal from '../../molecules/Modal/Modal';
import FormField from '../../molecules/FormField/FormField';
import { toast } from 'react-toastify';
import {
  FishTypeModalContainer,
  FishTypeModalHeader,
  FishTypeModalHeaderColor,
  FishTypeModalParagraph,
  FishTypeModalActions,
  FishTypeModalInputs,
  FishTypeModalTwoInputs,
} from './FishTypeModal-styled';

type FishType = {
  enemies: any[];
  id: number;
  maxGh: number;
  maxKh: number;
  maxNo2: number;
  maxNo3: number;
  maxPh: number;
  minGh: number;
  minKh: number;
  minNo2: number;
  minNo3: number;
  minPh: number;
  name: string;
};

interface FishTypeModalProps {
  showModal: boolean;
  setShowModal: (prev: any) => void;
  data: FishType;
  allFishTypes?: FishType[];
}

const FishTypeModal = ({
  showModal,
  setShowModal,
  data,
  allFishTypes,
}: FishTypeModalProps) => {
  const mappedFishTypes = allFishTypes
    ?.map(({ name }) => {
      return { label: name, value: name };
    })
    ?.filter(({ label }) => label !== data?.name);
  const defaultMappedFishTypes = data?.enemies?.map(({ name }: any) => {
    return { label: name, value: name };
  });
  const formMethods = useForm({
    defaultValues: data || {
      id: 0,
      name: '',
      enemies: [],
      maxGh: 0,
      maxKh: 0,
      maxNo2: 0,
      maxNo3: 0,
      maxPh: 0,
      minGh: 0,
      minKh: 0,
      minNo2: 0,
      minNo3: 0,
      minPh: 0,
    },
  });
  const { register, handleSubmit } = formMethods;
  const LinksCtx = useContext(LinksContext);

  const isNewFishType = !data || !data.id;

  const onSubmitHandler = async (formData: any) => {
    if (!LinksCtx || !LinksCtx.admin || !LinksCtx.admin.saveFishType) {
      return;
    }
    formData.id ??= 0;
    formData.enemies ??= [];
    formData.enemies = allFishTypes?.filter(({ name }) =>
      formData.enemies.includes(name)
    );
    // formData.enemies.forEach((enemy: any) => {
    //   enemy.enemies = [];
    // });
    if (isNewFishType) {
      try {
        await axios.post(LinksCtx.admin.saveFishType, formData);
        toast.success('Pomyślnie dodano gatunek ryb!', {
          toastId: 'FishTypeModal',
        });
      } catch {
        toast.error('Wystąpił błąd podczas dodawania gatunku ryb!', {
          toastId: 'FishTypeModal',
        });
      }
    } else {
      try {
        await axios.put(
          `${LinksCtx.admin.saveFishType}/${formData.id}`,
          formData
        );
        toast.success('Pomyślnie zaktualizowano gatunek ryb!', {
          toastId: 'FishTypeModal',
        });
      } catch {
        toast.error('Wystąpił błąd podczas aktualizacji gatunku ryb!', {
          toastId: 'FishTypeModal',
        });
      }
    }

    setShowModal(false);
  };

  const onCreateClickErrorHandler = (error: any) => {
    console.log(error);
  };

  const onFishTypeDeleteHandler = async () => {
    if (!LinksCtx || !LinksCtx.admin || !LinksCtx.admin.saveFishType) {
      return;
    }
    try {
      await axios.delete(`${LinksCtx.admin.saveFishType}/${data.id}`);
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
      <FishTypeModalContainer>
        <FishTypeModalHeader>
          {isNewFishType ? 'Dodaj nowy ' : 'Edytuj istniejący '}
          <FishTypeModalHeaderColor>gatunek ryb!</FishTypeModalHeaderColor>
        </FishTypeModalHeader>
        <FishTypeModalParagraph>
          Uzupełnij poniższe dane.
        </FishTypeModalParagraph>
        <FormProvider {...formMethods}>
          <form
            onSubmit={handleSubmit(onSubmitHandler, onCreateClickErrorHandler)}
          >
            <FishTypeModalInputs>
              <FormField
                type="text"
                title="Nazwa Ryby"
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
                title="Wrogie gatunki ryb"
                type="select"
                id="enemies"
                register={register}
                validators={{}}
                defaultValues={defaultMappedFishTypes || []}
                options={mappedFishTypes}
              />
              <FishTypeModalTwoInputs>
                <FormField
                  type="text"
                  title="Minimalna wartość GH"
                  id="minGh"
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
                  title="Maksymalna wartość GH"
                  id="maxGh"
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
              </FishTypeModalTwoInputs>

              <FishTypeModalTwoInputs>
                <FormField
                  type="text"
                  title="Minimalna wartość KH"
                  id="minKh"
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
                  title="Maksymalna wartość KH"
                  id="maxKh"
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
              </FishTypeModalTwoInputs>

              <FishTypeModalTwoInputs>
                <FormField
                  type="text"
                  title="Minimalna wartość NO2"
                  id="minNo2"
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
                  title="Maksymalna wartość NO2"
                  id="maxNo2"
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
              </FishTypeModalTwoInputs>

              <FishTypeModalTwoInputs>
                <FormField
                  type="text"
                  title="Minimalna wartość NO3"
                  id="minNo3"
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
                  title="Maksymalna wartość NO3"
                  id="maxNo3"
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
              </FishTypeModalTwoInputs>

              <FishTypeModalTwoInputs>
                <FormField
                  type="text"
                  title="Minimalna wartość pH"
                  id="minPh"
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
                    validate: {
                      correctMaxPh: (value: string) =>
                        (parseInt(value) <= 14 && parseInt(value) >= 0) ||
                        'Wartość musi być liczbą z przedziału 1-14',
                    },
                  }}
                />
                <FormField
                  type="text"
                  title="Maksymalna wartość pH"
                  id="maxPh"
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
                    validate: {
                      correctMaxPh: (value: string) =>
                        (parseInt(value) <= 14 && parseInt(value) >= 0) ||
                        'Wartość musi być liczbą z przedziału 1-14',
                    },
                  }}
                />
              </FishTypeModalTwoInputs>
            </FishTypeModalInputs>
            <FishTypeModalActions>
              {!isNewFishType && (
                <Button
                  text="Usuń Akcesorium"
                  onClick={onFishTypeDeleteHandler}
                  type="button"
                  variant="danger"
                />
              )}
              <Button
                text={isNewFishType ? 'Stwórz' : 'Aktualizuj'}
                type="submit"
              />
            </FishTypeModalActions>
          </form>
        </FormProvider>
      </FishTypeModalContainer>
    </Modal>
  );
};

export default FishTypeModal;
