import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import axios from 'axios';
import Modal from '../../molecules/Modal/Modal';
import FormField from '../../molecules/FormField/FormField';
import Button from '../../atoms/Button/Button';
import Icon from '../../atoms/Icon/Icon';
import Link from '../../atoms/Link/Link';
import {
  LoginModalContainer,
  LoginModalDivider,
  LoginModalDividerText,
  LoginModalFooter,
  LoginModalFooterButtonLabel,
  LoginModalFooterButton,
  LoginModalFooterButtonsWrapper,
  LoginModalForm,
  LoginModalHeader,
  LoginModalIconsWrapper,
  LoginModalLine,
  LoginModalParagraph,
  LoginModalFooterLegalNote,
} from './LoginModal-styled';
import { toast } from 'react-toastify';

interface LoginModalProps {
  showModal: boolean;
  setShowModal: (prev: any) => void;
  variant: 'login' | 'register';
}

const LoginModal = ({ showModal, setShowModal, variant }: LoginModalProps) => {
  const formMethods = useForm();
  const { register, control, handleSubmit, watch, resetField, setFocus } =
    formMethods;
  const [localVariant, setLocalVariant] = useState<'login' | 'register'>(
    variant
  );

  const loginUser = async (data: any) => {
    const bodyFormData = new URLSearchParams();
    bodyFormData.append('username', data.username);
    bodyFormData.append('password', data.password);
    const requestOptions = {
      method: 'POST',
      body: bodyFormData,
    };
    const authUrl = '/api/perform_login';
    const response = await fetch(authUrl, requestOptions);
    if (response.redirected) {
      window.location.href = response.url;
    } else {
      toast.error(
        'Wystąpił problem z twoim żądaniem! Spróbuj ponownie później',
        { toastId: 'loginError' }
      );
    }
  };

  const registerUser = async (data: any) => {
    const response = await axios.post(`/auth/register`, data);
    if (response.data.message) {
      toast.success(response.data.message, { toastId: 'registerSuccess' });
      setLocalVariant('login');
    }
  };

  const onSubmit = async (data: any) => {
    console.log(data);
    if (localVariant === 'login') {
      loginUser(data);
    } else if (localVariant === 'register') {
      registerUser(data);
    }
  };

  const isLoginVariant = localVariant === 'login';

  useEffect(() => {
    // Reset form fields and focus on Text inputs to adapt to custom label change in TextInput component
    setFocus('login');
    resetField('login');
    setFocus('password');
    resetField('password');
    setFocus('passwordConfirm');
    resetField('passwordConfirm');
    (document.activeElement as HTMLElement).blur();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localVariant]);

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <LoginModalContainer>
        <LoginModalHeader>
          Witaj w <span style={{ color: '#5A24EC' }}>e</span>formify!
        </LoginModalHeader>
        <LoginModalParagraph>
          {isLoginVariant ? 'Zaloguj się' : 'Zarejestruj się'}, aby uzyskać
          dostęp do wszystkich funkcjonalności.
        </LoginModalParagraph>
        <FormProvider {...formMethods}>
          <LoginModalForm onSubmit={handleSubmit(onSubmit)}>
            <FormField
              type="text"
              title="Login"
              id="username"
              register={register}
              validators={{
                required: {
                  value: true,
                  message: 'Login jest wymagany',
                },
                maxLength: {
                  value: 35,
                  message: 'Login może zawierać maksymalnie 35 znaków',
                },
              }}
              autocomplete="username"
            />
            <FormField
              type="password"
              title="Hasło"
              id="password"
              register={register}
              validators={{
                required: {
                  value: true,
                  message: 'Hasło jest wymagane',
                },
                maxLength: {
                  value: 35,
                  message: 'Hasło może zawierać maksymalnie 35 znaków',
                },
              }}
              autocomplete={
                isLoginVariant ? 'current-password' : 'new-password'
              }
            />
            {!isLoginVariant && (
              <FormField
                type="password"
                title="Potwierdź hasło"
                id="passwordConfirm"
                register={register}
                validators={{
                  required: {
                    value: true,
                    message: 'Potwierdzenie hasła jest wymagane',
                  },
                  maxLength: {
                    value: 35,
                    message:
                      'Potwierdzenie hasła może zawierać maksymalnie 35 znaków',
                  },
                  validate: (value: string) =>
                    value === watch('password') || 'Hasła nie są takie same',
                }}
                autocomplete="new-password"
              />
            )}
            <br />
            <Button
              type="submit"
              text={isLoginVariant ? 'Zaloguj się' : 'Zarejestruj się'}
            />
          </LoginModalForm>
        </FormProvider>

        <LoginModalDivider>
          <LoginModalLine />
          <LoginModalDividerText>LUB</LoginModalDividerText>
          <LoginModalLine />
        </LoginModalDivider>
        <LoginModalIconsWrapper>
          <Link href="/auth/google">
            <Icon variant="Google" withhover="true" />
          </Link>
          <Link href="/auth/facebook">
            <Icon variant="Facebook" withhover="true" />
          </Link>
          <Link href="/auth/github">
            <Icon variant="Github" withhover="true" />
          </Link>
        </LoginModalIconsWrapper>
        <LoginModalFooter>
          <LoginModalFooterButtonsWrapper>
            <LoginModalFooterButtonLabel>
              {isLoginVariant ? 'Nie masz konta?' : 'Masz już konto?'}
            </LoginModalFooterButtonLabel>
            <LoginModalFooterButton
              onClick={() => {
                setLocalVariant(isLoginVariant ? 'register' : 'login');
              }}
            >
              {isLoginVariant ? 'Zarejestruj się' : 'Zaloguj się'}
            </LoginModalFooterButton>
          </LoginModalFooterButtonsWrapper>
          <LoginModalFooterLegalNote>
            © 2023 AquaFriends
          </LoginModalFooterLegalNote>
        </LoginModalFooter>
      </LoginModalContainer>
      <DevTool control={control} />
    </Modal>
  );
};

export default LoginModal;
