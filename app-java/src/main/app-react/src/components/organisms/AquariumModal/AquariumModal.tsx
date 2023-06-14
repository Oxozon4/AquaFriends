/* eslint-disable @typescript-eslint/no-empty-function */
import { useState, useEffect, useRef, useMemo, useContext } from 'react';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { LinksContext } from '../../../providers/LinksProvider';
import { toast } from 'react-toastify';
import {
  FishType,
  AccessoryType,
  DecoratorType,
  AquariumType,
} from '../../templates/Dashboard/Dashboard';

import Select from '../../atoms/Select/Select';
import { DevTool } from '@hookform/devtools';
import Modal from '../../molecules/Modal/Modal';
import ProgressBar from '../../atoms/ProgressBar/ProgressBar';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Button from '../../atoms/Button/Button';
import FormField from '../../molecules/FormField/FormField';
import {
  AquariumModalContainer,
  AquariumModalHeader,
  AquariumContentWrapper,
  AquariumModalFooter,
  AquariumContentHeader,
  AquariumContentDescription,
  AquariumForm,
  FishItemBox,
  FishItemTitle,
  FishItemDeleteIconWrapper,
  DecoratorInputContainer,
} from './AquariumModal-styled';
import Link from '../../atoms/Link/Link';
import Icon from '../../atoms/Icon/Icon';
import axios from 'axios';

interface FormCreationModalProps {
  showModal: boolean;
  setShowModal: (prev: any) => void;
  aquariumData: any | null;
  aquariumTemplates: any[];
  fishTypes: FishType[];
  accessories: AccessoryType[];
  decorators: DecoratorType[];
}

type SectionValues = {
  [key: string]: any;
}[];

const AquariumModal: React.FC<FormCreationModalProps> = ({
  showModal,
  setShowModal,
  aquariumData: formData,
  aquariumTemplates,
  fishTypes,
  accessories,
  decorators,
}: FormCreationModalProps) => {
  const LinksCtx = useContext(LinksContext);

  const [activeStep, setActiveStep] = useState(0);
  const [isAllowSwipeNext, setIsAllowSwipeNext] = useState(false);
  const [isAllowSwipePrev, setIsAllowSwipePrev] = useState(false);
  const [isSelectedTemplate, setIsSelectedTemplate] = useState(false);

  const swiperRef = useRef<any>(null);
  const modalContainerRef = useRef<HTMLDivElement | null>(null);

  const isEditVariant = !!formData.id;

  const formMethods = useForm<any>({
    defaultValues: isEditVariant
      ? {
          sections: [
            {
              name: formData.name,
              length: formData.length,
              width: formData.width,
              height: formData.height,
              accessories: formData.accessories,
            },
            {
              decorators: formData.decorators.map(({ name }: any) => {
                return name;
              })[0],
            },
            {
              fishes: formData.fishes.map((fish: any) => {
                return {
                  fishType: fish.fishType?.name,
                  id: fish.id,
                  _id: fish.id,
                  birthDay: fish.birthDay,
                  healthStatus: fish.healthStatus,
                };
              }),
            },
          ],
        }
      : {
          sections: [
            {
              name: '',
              length: '',
              width: '',
              height: '',
              accessories: ['Wybierz akcesoria'],
            },
            {
              decorators: ['Wybierz dekoracje'],
            },
            {
              fishes: [
                {
                  fishType: 'Wybierz gatunek ryby',
                  birthDay: 123,
                  healthStatus: 'HEALTHY',
                  id: 0,
                },
              ],
            },
          ],
        },
  });
  const {
    control,
    register,
    handleSubmit,
    getValues,
    trigger,
    watch,
    setValue,
    setFocus,
    formState: { errors },
  } = formMethods;
  const {
    fields: fishesFields,
    append,
    remove,
  } = useFieldArray({
    name: 'sections.2.fishes',
    control,
  });

  const mappedAccessories = accessories.map(({ name, volume }) => {
    return { label: name, value: `${volume}` };
  });
  const mappedDecorators = decorators.map(({ name }) => {
    return { label: name, value: `${name}` };
  });
  const mappedFishTypes = fishTypes.map(({ name }) => {
    return { label: name, value: `${name}` };
  });
  const mappedAquariumTemplates = aquariumTemplates.map(({ name }) => {
    return { label: name, value: `${name}` };
  });

  const activeTemplate = watch('sections.0.aquariumTemplate');

  const validateStep = async () => {
    if (!formData) {
      return false;
    }

    const isValid = await trigger(`sections.${activeStep}`, {
      shouldFocus: true,
    });
    swiperRef.current.updateAutoHeight(0);
    return isValid;
  };

  const goToNextStep = async () => {
    if (!formData || activeStep + 1 > 3) {
      return;
    }

    if (!(await validateStep())) {
      return;
    }

    if (activeStep + 1 === 3) {
      const filledFormData = getValues();
      let aquariumData: any = {};
      getValues().sections.forEach((section: any) => {
        aquariumData = { ...aquariumData, ...section };
      });

      const selectedDecorators = decorators.filter((decorator) => {
        return decorator.name === aquariumData.decorators;
      })[0];
      aquariumData.decorators = [selectedDecorators];

      const selectedAccessories = accessories.filter((accessory) => {
        return accessory.volume === aquariumData.accessories;
      })[0];
      aquariumData.accessories = [selectedAccessories];

      delete aquariumData.aquariumTemplate;

      aquariumData.fishes.forEach((fish: any, index: number) => {
        const fishObj = fishTypes.find((fishType) => {
          return fishType.name === fish.fishType;
        });
        aquariumData.fishes[index].fishType = fishObj;
      });

      if (!LinksCtx || !LinksCtx.user || !LinksCtx.user.saveAquarium) {
        return;
      }

      if (isEditVariant) {
        const newAquariumData: any = await axios.put(
          `${LinksCtx.user.saveAquarium}/${formData.id}`,
          aquariumData
        );
        const { fishes } = aquariumData;
        const aquariumIdData = { id: newAquariumData.data.id };

        await fishes.forEach(async (fish: any) => {
          console.log(filledFormData);
          if (!fish.id || fish.id === 0) {
            await axios.post(`${LinksCtx.user.saveFish}`, {
              aquarium: aquariumIdData,
              ...fish,
            });
          } else {
            await axios.put(`${LinksCtx.user.saveFish}/${fish.id}`, {
              aquarium: aquariumIdData,
              ...fish,
            });
          }
        });
        setTimeout(() => {
          toast.success('Akwarium zaktualizowane pomyślnie!', {
            toastId: 'status',
          });
          setShowModal(false);
        }, 50);

        return;
      } else {
        const newAquariumData: any = await axios.post(
          LinksCtx.user.saveAquarium,
          aquariumData
        );

        const { fishes } = aquariumData;
        const aquariumIdData = { id: newAquariumData.data.id };

        await fishes.forEach(async (fish: any) => {
          await axios.post(LinksCtx.user.saveFish, {
            aquarium: aquariumIdData,
            ...fish,
          });
        });

        setTimeout(() => {
          toast.success('Akwarium stworzone pomyślnie!', {
            toastId: 'status',
          });
          setShowModal(false);
        }, 50);

        return;
      }
    }
    setActiveStep((prevActiveStep) => (prevActiveStep += 1));
    setIsAllowSwipeNext(true);
  };

  const goToPrevStep = () => {
    if (!formData || activeStep <= 0 || activeStep > 3) {
      return;
    }
    setActiveStep((prevActiveStep) => (prevActiveStep -= 1));
    setIsAllowSwipePrev(true);
  };

  const onSwiperTouchEndHandler = (swiper: any) => {
    if (!modalContainerRef.current || !formData) {
      return;
    }
    const maxSwipeHeight = 0.25;
    const minSwipeWidth = 0.5;

    const isTouchVertical =
      Math.abs(swiper.touches.currentY - swiper.touches.startY) >
      window.innerHeight * maxSwipeHeight;
    if (!isTouchVertical) {
      const containerWidth = modalContainerRef.current.clientWidth;
      const isSwipeToNextStep =
        swiper.touches.currentX + containerWidth * minSwipeWidth <
        swiper.touches.startX;
      const isSwipeToPrevStep =
        swiper.touches.currentX >
        swiper.touches.startX + containerWidth * minSwipeWidth;
      if (isSwipeToNextStep) {
        swiper.slideNext();
        goToNextStep();
      } else if (isSwipeToPrevStep) {
        goToPrevStep();
      }
    }
  };

  useEffect(() => {
    if (isAllowSwipeNext && swiperRef.current) {
      swiperRef.current.slideNext();
      setIsAllowSwipeNext(false);
    }
  }, [isAllowSwipeNext]);

  useEffect(() => {
    if (isAllowSwipePrev && swiperRef.current) {
      swiperRef.current.slidePrev();
      setIsAllowSwipePrev(false);
    }
  }, [isAllowSwipePrev]);

  useEffect(() => {
    if (
      !activeTemplate ||
      !aquariumTemplates ||
      activeTemplate.includes('Wybierz')
    ) {
      setIsSelectedTemplate(false);
      setValue('sections.0.length', '');
      setValue('sections.0.width', '');
      setValue('sections.0.height', '');
      return;
    }

    const [activeAquariumTemplate] = aquariumTemplates.filter(
      ({ name }) => name === activeTemplate
    );
    if (activeAquariumTemplate) {
      setFocus('sections.0.length');
      setValue('sections.0.length', activeAquariumTemplate.length);
      setFocus('sections.0.width');
      setValue('sections.0.width', activeAquariumTemplate.width);
      setFocus('sections.0.height');
      setValue('sections.0.height', activeAquariumTemplate.height);
      setFocus('sections.0.accessories');
      setValue(
        'sections.0.accessories',
        activeAquariumTemplate.accessories.map(({ volume }: any) => {
          return volume;
        })[0]
      );
      setIsSelectedTemplate(true);
    }
  }, [activeTemplate, aquariumTemplates, setFocus, setValue]);

  const onFishAppend = () => {
    append({
      fishType: 'Wybierz gatunek ryby',
      birthDay: 123,
      healthStatus: 'HEALTHY',
      id: 0,
    });
    setTimeout(() => {
      swiperRef.current.updateAutoHeight(0);
    }, 10);
  };

  const onFishRemove = (index: number, fishData: any) => {
    if (LinksCtx && LinksCtx.user && LinksCtx.user.saveFish) {
      if (fishData._id && fishData._id !== 0) {
        axios.delete(`${LinksCtx.user.saveFish}/${fishData._id}`);
      }
    }

    remove(index);
    setTimeout(() => {
      swiperRef.current.updateAutoHeight(0);
    }, 10);
  };

  useEffect(() => {
    const setDefaultTextInputs = () => {
      if (isEditVariant && formData.id) {
        setFocus('sections.0.length');
        setValue('sections.0.length', formData.length);
        setFocus('sections.0.width');
        setValue('sections.0.width', formData.width);
        setFocus('sections.0.height');
        setValue('sections.0.height', formData.height);
        setFocus('sections.0.accessories');
        setValue(
          'sections.0.accessories',
          formData.accessories.map(({ volume }: any) => {
            return volume;
          })[0]
        );
      }
    };

    setDefaultTextInputs();
  }, [
    formData.accessories,
    formData.height,
    formData.id,
    formData.length,
    formData.width,
    isEditVariant,
    setFocus,
    setValue,
  ]);

  if (!formData) return null;

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <AquariumModalContainer ref={modalContainerRef}>
        <AquariumModalHeader>
          {isEditVariant
            ? 'Edytuj istniejące akwarium'
            : 'Stwórz nowe akwarium'}
        </AquariumModalHeader>
        <ProgressBar activeStep={activeStep} stepsNumber={3} />
        <AquariumForm onSubmit={handleSubmit(() => {})}>
          <FormProvider {...formMethods}>
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onTouchEnd={onSwiperTouchEndHandler}
              allowSlideNext={isAllowSwipeNext}
              allowSlidePrev={isAllowSwipePrev}
              autoHeight={true}
            >
              <SwiperSlide>
                <AquariumContentWrapper>
                  <AquariumContentHeader>
                    Wymiary akwarium
                  </AquariumContentHeader>
                  {!isEditVariant && (
                    <Select
                      id="sections.0.aquariumTemplate"
                      register={register}
                      validators={{}}
                      options={mappedAquariumTemplates}
                      title="Wybierz szablon"
                      defaultValue="Wybierz szablon"
                    />
                  )}

                  <FormField
                    title="Nazwa akwarium"
                    type="text"
                    id="sections.0.name"
                    register={register}
                    validators={{
                      required: {
                        value: true,
                        message: 'To pole jest wymagane!',
                      },
                      maxLength: {
                        value: 35,
                        message: 'To pole może zawierać maksymalnie 35 znaków!',
                      },
                    }}
                  />
                  <FormField
                    type="text"
                    title="Długość akwarium (cm)"
                    id="sections.0.length"
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
                    isDisabled={isSelectedTemplate || isEditVariant}
                  />
                  <FormField
                    type="text"
                    title="Szerokość akwarium (cm)"
                    id="sections.0.width"
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
                    isDisabled={isSelectedTemplate || isEditVariant}
                  />
                  <FormField
                    type="text"
                    title="Wysokość akwarium (cm)"
                    id="sections.0.height"
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
                    isDisabled={isSelectedTemplate || isEditVariant}
                  />
                  <Select
                    id="sections.0.accessories"
                    register={register}
                    validators={{}}
                    options={mappedAccessories}
                    title="Wybierz akcesoria"
                    isDisabled={isSelectedTemplate || isEditVariant}
                  />

                  {/* <FormField
                    type="select"
                    title="Akcesoria"
                    id="sections.0.accessories"
                    register={register}
                    validators={{}}
                    options={mappedAccessories}
                    // defaultValues={[{ label: 'testt', value: '1' }]}
                  /> */}
                </AquariumContentWrapper>
              </SwiperSlide>
              <SwiperSlide>
                <AquariumContentWrapper>
                  <AquariumContentHeader>
                    Dekoracje akwarium
                  </AquariumContentHeader>
                  <DecoratorInputContainer>
                    <Select
                      id="sections.1.decorators"
                      register={register}
                      validators={{
                        required: {
                          value: true,
                          message: 'To pole jest wymagane!',
                        },
                        validate: (value: string) =>
                          value !== 'Wybierz dekoracje' ||
                          'Rodzaj dekoracji jest wymagany!',
                      }}
                      options={mappedDecorators}
                      title="Wybierz dekoracje"
                    />
                  </DecoratorInputContainer>
                </AquariumContentWrapper>
              </SwiperSlide>
              <SwiperSlide>
                <AquariumContentWrapper>
                  <AquariumContentHeader>Ryby w akwarium</AquariumContentHeader>
                  {fishesFields.map((fish, index) => {
                    return (
                      <FishItemBox key={index}>
                        {index > 0 && (
                          <FishItemDeleteIconWrapper>
                            <Link
                              onClick={() => onFishRemove(index, fish)}
                              title={`Usuń rybę nr ${index + 1}`}
                            >
                              <Icon variant="Close" size="24px" />
                            </Link>
                          </FishItemDeleteIconWrapper>
                        )}
                        <FishItemTitle>Ryba nr {index + 1}</FishItemTitle>

                        <Select
                          id={`sections.2.fishes.${index}.fishType`}
                          register={register}
                          validators={{
                            required: {
                              value: true,
                              message: 'To pole jest wymagane!',
                            },
                            validate: (value: string) =>
                              value !== 'Wybierz gatunek ryby' ||
                              'Gatunek ryby jest wymagany!',
                          }}
                          options={mappedFishTypes}
                          title="Wybierz gatunek ryby"
                        />
                      </FishItemBox>
                    );
                  })}
                  <Button
                    type="button"
                    text="Dodaj rybę"
                    onClick={onFishAppend}
                  />
                </AquariumContentWrapper>
              </SwiperSlide>
            </Swiper>
          </FormProvider>
        </AquariumForm>

        <AquariumModalFooter>
          {activeStep > 0 ? (
            <Button variant="secondary" onClick={goToPrevStep} text="Wstecz" />
          ) : (
            <div></div>
          )}

          <Button
            variant="primary"
            onClick={goToNextStep}
            text={activeStep + 1 < 3 ? 'Dalej' : 'Zapisz'}
          />
        </AquariumModalFooter>
      </AquariumModalContainer>
      <DevTool control={control} />
    </Modal>
  );
};

export default AquariumModal;
