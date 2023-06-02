import { useState, useEffect, useContext } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { LinksContext } from '../../../providers/LinksProvider';
import { DevTool } from '@hookform/devtools';
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
  const LinksCtx = useContext(LinksContext);
  const formMethods = useForm();
  const {
    register,
    control,
    handleSubmit,
    watch,
    resetField,
    setFocus,
    formState: { errors },
  } = formMethods;
  const [localVariant, setLocalVariant] = useState<'login' | 'register'>(
    variant
  );

  const loginUser = async (data: any) => {
    if (!LinksCtx) {
      return;
    }
    const bodyFormData = new URLSearchParams();
    bodyFormData.append('username', data.email);
    bodyFormData.append('password', data.password);
    const requestOptions = {
      method: 'POST',
      body: bodyFormData,
    };
    const authUrl = LinksCtx.auth.login;
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
    if (!LinksCtx) {
      return;
    }
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const authUrl = LinksCtx.auth.register;
    const response = await fetch(authUrl, requestOptions);
    if (!response.ok) {
      toast.error(
        'Wystąpił problem z twoim żądaniem! Spróbuj ponownie później',
        { toastId: 'loginError' }
      );
      return;
    }
    toast.success('Zarejestrowano pomyślnie!', { toastId: 'registerSuccess' });
    setLocalVariant('login');
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
    setFocus('email');
    resetField('email');
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
          Witaj w <span style={{ color: '#3185FC' }}>AquaFriends</span>!
        </LoginModalHeader>
        <LoginModalParagraph>
          {isLoginVariant ? 'Zaloguj się' : 'Zarejestruj się'}, aby uzyskać
          dostęp do wszystkich funkcjonalności.
        </LoginModalParagraph>
        <FormProvider {...formMethods}>
          <LoginModalForm onSubmit={handleSubmit(onSubmit)}>
            <FormField
              type="email"
              title="Adres e-mail"
              id="email"
              register={register}
              validators={{
                required: {
                  value: true,
                  message: 'Adres e-mail jest wymagany',
                },
                maxLength: {
                  value: 35,
                  message: 'Adres e-mail może zawierać maksymalnie 35 znaków',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Adres e-mail ma niepoprawny format',
                  },
                },
              }}
              autocomplete="new-password"
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
              <>
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
                <FormField
                  type="text"
                  title="Imię"
                  id="firstName"
                  register={register}
                  validators={{
                    required: {
                      value: true,
                      message: 'Imię jest wymagane',
                    },
                    maxLength: {
                      value: 35,
                      message: 'Imię może zawierać maksymalnie 35 znaków',
                    },
                  }}
                  autocomplete="firstName"
                />
                <FormField
                  type="text"
                  title="Nazwisko"
                  id="lastName"
                  register={register}
                  validators={{
                    required: {
                      value: true,
                      message: 'Nazwisko jest wymagane',
                    },
                    maxLength: {
                      value: 35,
                      message: 'Nazwisko może zawierać maksymalnie 35 znaków',
                    },
                  }}
                  autocomplete="lastName"
                />
                <FormField
                  type="number"
                  title="Wiek"
                  id="age"
                  register={register}
                  validators={{
                    required: {
                      value: true,
                      message: 'Wiek jest wymagany',
                    },
                    validate: {
                      correctAge: (value: number) =>
                        (value > 0 && value < 100) ||
                        'Wiek musi być liczbą z przedziału 1-99',
                      minAge: (value: number) =>
                        value >= 16 ||
                        'Minimalny wiek by korzystać z AquaFriends to 16 lat',
                    },
                  }}
                  autocomplete="lastName"
                />
              </>
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
