/* eslint-disable @typescript-eslint/no-empty-function */
import { useState, useEffect, useRef, useMemo } from 'react';
import { useForm, FormProvider, useFieldArray, Form } from 'react-hook-form';
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
} from './AquariumModal-styled';
import Link from '../../atoms/Link/Link';
import Icon from '../../atoms/Icon/Icon';

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

  const [activeStep, setActiveStep] = useState(0);
  const [isAllowSwipeNext, setIsAllowSwipeNext] = useState(false);
  const [isAllowSwipePrev, setIsAllowSwipePrev] = useState(false);
  const [isSelectedTemplate, setIsSelectedTemplate] = useState(false);

  const swiperRef = useRef<any>(null);
  const modalContainerRef = useRef<HTMLDivElement | null>(null);

  const formMethods = useForm<any>({
    defaultValues: {
      sections: [
        {
          name: '',
          length: '',
          width: '',
          height: '',
        },
        {
          decorators: ['Wybierz dekoracje'],
        },
        {
          fishes: [
            {
              fishType: 'Wybierz gatunek ryby',
              birthDay: '',
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
      const formData = getValues();
      let aquariumData = {};
      getValues().sections.forEach((section: any) => {
        aquariumData = { ...aquariumData, ...section };
      });
      toast.success('Formularz wypełniony pomyślnie!', { toastId: 'status' });
      setShowModal(false);
      return;
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
      setValue('sections.0.name', '');
      setValue('sections.0.length', '');
      setValue('sections.0.width', '');
      setValue('sections.0.height', '');
      return;
    }

    const [activeAquariumTemplate] = aquariumTemplates.filter(
      ({ name }) => name === activeTemplate
    );
    if (activeAquariumTemplate) {
      setFocus('sections.0.name');
      setValue('sections.0.name', activeAquariumTemplate.name);
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
      birthDay: '',
      healthStatus: 'HEALTHY',
      id: 0,
    });
    setTimeout(() => {
      swiperRef.current.updateAutoHeight(0);
    }, 10);
  };

  const onFishRemove = (index: number) => {
    remove(index);
    setTimeout(() => {
      swiperRef.current.updateAutoHeight(0);
    }, 10);
  };

  if (!formData) return null;

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <AquariumModalContainer ref={modalContainerRef}>
        <AquariumModalHeader>Stwórz nowe akwarium</AquariumModalHeader>
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
                  <Select
                    id="sections.0.aquariumTemplate"
                    register={register}
                    validators={{}}
                    options={mappedAquariumTemplates}
                    title="Wybierz szablon"
                    defaultValue="Wybierz szablon"
                  />
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
                    isDisabled={isSelectedTemplate}
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
                    isDisabled={isSelectedTemplate}
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
                    isDisabled={isSelectedTemplate}
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
                    isDisabled={isSelectedTemplate}
                  />
                  <Select
                    id="sections.0.accessories"
                    register={register}
                    validators={{}}
                    options={mappedAccessories}
                    title="Wybierz akcesoria"
                    isDisabled={isSelectedTemplate}
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
                              onClick={() => onFishRemove(index)}
                              title={`Usuń rybę nr ${index + 1}`}
                            >
                              <Icon variant="Close" size="24px" />
                            </Link>
                          </FishItemDeleteIconWrapper>
                        )}
                        <FishItemTitle>Ryba nr {index}</FishItemTitle>

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
