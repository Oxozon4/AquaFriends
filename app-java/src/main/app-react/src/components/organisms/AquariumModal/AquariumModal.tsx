/* eslint-disable @typescript-eslint/no-empty-function */
import { useState, useEffect, useRef, useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

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
} from './AquariumModal-styled';
import { toast } from 'react-toastify';
import {
  FishType,
  AccessoryType,
  DecoratorType,
  AquariumType,
} from '../../templates/Dashboard/Dashboard';

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
  const [activeStep, setActiveStep] = useState(0);
  const [isAllowSwipeNext, setIsAllowSwipeNext] = useState(false);
  const [isAllowSwipePrev, setIsAllowSwipePrev] = useState(false);

  const swiperRef = useRef<any>(null);
  const modalContainerRef = useRef<HTMLDivElement | null>(null);

  const formMethods = useForm<any>({
    defaultValues: {},
  });
  const {
    control,
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors },
  } = formMethods;

  console.log(formData);

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
      console.log(getValues());

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

  useEffect(() => {}, []);

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
                  {/* <AquariumContentDescription>
                Podaj wymiary akwarium.
              </AquariumContentDescription> */}

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
                  />
                  <FormField
                    type="select"
                    title="Akcesoria"
                    id="sections.0.accessories"
                    register={register}
                    validators={{}}
                    options={[
                      { label: 'testt', value: '1' },
                      { label: 'testt2', value: '2' },
                      { label: 'testt3', value: 'test3' },
                    ]}
                    defaultValues={[{ label: 'testt', value: '1' }]}
                  />
                </AquariumContentWrapper>
              </SwiperSlide>
              <SwiperSlide>
                <AquariumContentWrapper>
                  <AquariumContentHeader>
                    Dekoracje akwarium
                  </AquariumContentHeader>
                </AquariumContentWrapper>
              </SwiperSlide>
              <SwiperSlide>
                <AquariumContentWrapper>
                  <AquariumContentHeader>Ryby w akwarium</AquariumContentHeader>
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
