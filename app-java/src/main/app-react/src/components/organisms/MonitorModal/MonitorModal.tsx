import { useContext, useState, useRef } from 'react';
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

interface MonitorModalProps {
  showModal: boolean;
  setShowModal: (prev: any) => void;
  data: any;
}

const MonitorModal = ({ showModal, setShowModal, data }: MonitorModalProps) => {
  const formMethods = useForm({
    defaultValues: data || {
      gh: '',
      kh: '',
      no2: '',
      no3: '',
      ph: '',
    },
  });
  const { register, handleSubmit, setFocus, setValue, watch } = formMethods;
  const LinksCtx = useContext(LinksContext);

  const [isAnalysisMode, setIsAnalysisMode] = useState(false);

  const warningsRef = useRef<
    {
      message: string;
      target?: string;
      action?: string;
    }[]
  >([]);

  const onSubmitHandler = async (data: any) => {
    if (!LinksCtx || !LinksCtx.admin || !LinksCtx.admin.saveAccessoryType) {
      return;
    }

    setShowModal(false);
  };

  const onAnalyzeClickHandler = () => {
    warningsRef.current.push({ message: 'test' });
    if (warningsRef.current.length) {
      setIsAnalysisMode(true);
    }
  };

  const onCreateClickErrorHandler = (error: any) => {
    console.log(error);
  };

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
