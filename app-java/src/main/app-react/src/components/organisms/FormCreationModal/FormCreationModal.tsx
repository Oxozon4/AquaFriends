import { useForm, useFieldArray, FormProvider } from 'react-hook-form';

import Modal from '../../molecules/Modal/Modal';
import Button from '../../atoms/Button/Button';
import {
  FormCreationModalContainer,
  FormCreationModalHeader,
  FormCreationModalHeaderColor,
  FormCreationModalParagraph,
  FormCreationModalActions,
  FormCreationModalCreateSection,
} from './FormCreationModal-styled';

interface FormCreationModalProps {
  showModal: boolean;
  setShowModal: (prev: any) => void;
}

interface FormValues {
  _id?: string;
  sections: {
    id: number;
    title: string;
    description: string;
    questions: {
      id: number;
      title: string;
      type: string;
      options: string[];
      required: boolean;
    }[];
  }[];
}

const FormCreationModal = ({
  showModal,
  setShowModal,
}: FormCreationModalProps) => {
  const formMethods = useForm<FormValues>({
    defaultValues: {},
  });
  const { control, handleSubmit } = formMethods;
  const { fields: sectionFields, append } = useFieldArray({
    name: 'sections',
    control,
  });

  const onCreateSectionClickHandler = () => {
    append({
      id: sectionFields.length,
      title: '',
      description: '',
      questions: [
        {
          id: 0,
          title: '',
          type: 'text',
          options: [],
          required: false,
        },
      ],
    });
  };

  const onSubmitHandler = async (data: FormValues) => {
    console.log(data);
  };

  const onCreateClickErrorHandler = (e: any) => {
    console.log('error', e);
  };

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <FormCreationModalContainer>
        <FormCreationModalHeader>
          Stwórz nowy
          <FormCreationModalHeaderColor>
            formularz!
          </FormCreationModalHeaderColor>
        </FormCreationModalHeader>
        <FormCreationModalParagraph>
          Uzupełnij poniższe dane.
        </FormCreationModalParagraph>
        <FormProvider {...formMethods}>
          <form
            onSubmit={handleSubmit(onSubmitHandler, onCreateClickErrorHandler)}
          >
            <FormCreationModalCreateSection>
              <Button
                text="Dodaj sekcję"
                variant="secondary"
                onClick={onCreateSectionClickHandler}
                type="button"
              />
            </FormCreationModalCreateSection>
            <FormCreationModalActions>
              <Button text="Stwórz" type="submit" />
            </FormCreationModalActions>
          </form>
        </FormProvider>
      </FormCreationModalContainer>
    </Modal>
  );
};

export default FormCreationModal;
