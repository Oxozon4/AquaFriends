import { useContext, useState, useRef, useEffect } from 'react';
import { LinksContext } from '../../../providers/LinksProvider';
import { useForm, FormProvider } from 'react-hook-form';

import Button from '../../atoms/Button/Button';
import Modal from '../../molecules/Modal/Modal';
import FormField from '../../molecules/FormField/FormField';
import ToastContent from '../../molecules/ToastContent/ToastContent';
import {
  MonitorModalContainer,
  MonitorModalHeader,
  MonitorModalHeaderColor,
  MonitorModalParagraph,
  MonitorModalActions,
  MonitorModalInputs,
} from './MonitorModal-styled';
import axios from 'axios';
import { toast } from 'react-toastify';

interface MonitorModalProps {
  showModal: boolean;
  setShowModal: (prev: any) => void;
  id: any;
  aquarium: any;
}

const MonitorModal = ({
  showModal,
  setShowModal,
  id,
  aquarium,
}: MonitorModalProps) => {
  const formMethods = useForm({
    defaultValues: {
      gh: '',
      kh: '',
      no2: '',
      no3: '',
      ph: '',
    },
  });
  const { register, handleSubmit, setFocus, setValue, watch, trigger } =
    formMethods;
  const LinksCtx = useContext(LinksContext);

  const [isAnalysisMode, setIsAnalysisMode] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [allKnowledge, setAllKnowledge] = useState<any[]>([]);
  console.log(aquarium, id);

  const warningsRef = useRef<
    {
      message: string;
      target?: string;
      action?: string;
    }[]
  >([]);

  const onSubmitHandler = async (formData: any) => {
    if (
      !LinksCtx ||
      !LinksCtx.user ||
      !LinksCtx.user.saveParametersHistory ||
      !formData
    ) {
      return;
    }

    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    formData.id = id ? id : 0;
    formData.timestamp ??= timestamp;
    try {
      await axios.post(
        `${LinksCtx.user.saveParametersHistory.replace(
          '/{aquariumId}',
          ''
        )}/${id}`,
        formData
      );
      toast.success('Parametry zostały zapisane.');
    } catch {
      toast.error('Nie udało się zapisać parametrów.');
    }
    setShowModal(false);
  };

  const onAnalyzeClickHandler = async () => {
    if (!LinksCtx || !LinksCtx.admin || !LinksCtx.user.getAllKnowledge) {
      return;
    }
    const isValid = await trigger();
    if (!isValid) {
      return;
    }

    const response = await axios.get(LinksCtx.user.getAllKnowledge);

    if (
      !response ||
      !response.data ||
      !response.data._embedded ||
      !response.data._embedded.uiKnowledgeList
    ) {
      toast.error('Nie udało się pobrać porad z bazy danych.');
      return;
    }
    const knowledgeList = response.data._embedded.uiKnowledgeList;
    setAllKnowledge(knowledgeList);
    knowledgeList.forEach(
      ({
        info,
        min,
        max,
        problemType,
      }: {
        id: number;
        info: string;
        max: number;
        min: number;
        problemType: string;
      }) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const problemTypeFieldValue = watch(problemType.toLowerCase());
        if (!problemTypeFieldValue) {
          return;
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (problemTypeFieldValue >= min && problemTypeFieldValue <= max) {
          warningsRef.current.push({
            message: info,
          });
        }
      }
    );
    aquarium?.fishes.forEach((fish: any) => {
      const {
        fishType: {
          name,
          maxGh,
          maxKh,
          maxNo2,
          maxNo3,
          maxPh,
          minGh,
          minKh,
          minNo2,
          minNo3,
          minPh,
        },
      } = fish;
      const ghFieldValue = watch('gh');
      const khFieldValue = watch('kh');
      const no2FieldValue = watch('no2');
      const no3FieldValue = watch('no3');
      const phFieldValue = watch('ph');

      if (ghFieldValue < minGh || ghFieldValue > maxGh) {
        warningsRef.current.push({
          message: `Wartość GH jest za ${
            ghFieldValue < minGh ? 'mała' : 'duża'
          } dla gatunku: ${name}!`,
        });
      }
      if (khFieldValue < minKh || khFieldValue > maxKh) {
        warningsRef.current.push({
          message: `Wartość KH jest za ${
            khFieldValue < minKh ? 'mała' : 'duża'
          } dla gatunku: ${name}!`,
        });
      }
      if (no2FieldValue < minNo2 || no2FieldValue > maxNo2) {
        warningsRef.current.push({
          message: `Wartość NO2 jest za ${
            no2FieldValue < minNo2 ? 'mała' : 'duża'
          } dla gatunku: ${name}!`,
        });
      }
      if (no3FieldValue < minNo3 || no3FieldValue > maxNo3) {
        warningsRef.current.push({
          message: `Wartość NO3 jest za ${
            no3FieldValue < minNo3 ? 'mała' : 'duża'
          } dla gatunku: ${name}!`,
        });
      }
      if (phFieldValue < minPh || phFieldValue > maxPh) {
        warningsRef.current.push({
          message: `Wartość PH jest za ${
            phFieldValue < minPh ? 'mała' : 'duża'
          } dla gatunku: ${name}!`,
        });
      }
    });

    if (warningsRef.current.length) {
      setIsAnalysisMode(true);
    } else {
      toast.success('Wszystkie parametry w porządku!');
    }
  };

  const onCreateClickErrorHandler = (error: any) => {
    console.log(error);
  };

  useEffect(() => {
    if (!isAnalysisMode) {
      warningsRef.current = [];
    }
  }, [isAnalysisMode]);

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      {isAnalysisMode && (
        <ToastContent
          onFinish={() => setIsAnalysisMode(false)}
          warnings={warningsRef.current}
          setFocus={setFocus}
          setValue={setValue}
          watch={watch}
        />
      )}
      <MonitorModalContainer>
        <MonitorModalHeader>
          Dodaj nowy raport
          <MonitorModalHeaderColor> wody!</MonitorModalHeaderColor>
        </MonitorModalHeader>
        <MonitorModalParagraph>Uzupełnij poniższe dane.</MonitorModalParagraph>
        <FormProvider {...formMethods}>
          <form
            onSubmit={handleSubmit(onSubmitHandler, onCreateClickErrorHandler)}
          >
            <MonitorModalInputs>
              <FormField
                type="text"
                title="Wartość GH"
                id="gh"
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
                title="Wartość KH"
                id="kh"
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
                title="Wartość NO2"
                id="no2"
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
                title="Wartość NO3"
                id="no3"
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
                title="Wartość PH"
                id="ph"
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
            </MonitorModalInputs>
            <MonitorModalActions>
              <Button
                text="Analizuj"
                type="button"
                variant="secondary"
                onClick={onAnalyzeClickHandler}
              />
              <Button text="Zapisz" type="submit" />
            </MonitorModalActions>
          </form>
        </FormProvider>
      </MonitorModalContainer>
    </Modal>
  );
};

export default MonitorModal;
