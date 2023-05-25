import React, { useState } from 'react';
import {
  LoginTitle,
  TextSpan,
  GreenTextWrapper,
  UserInputWrapper,
  UserInput,
  PrimaryButton,
  DividerWrapper,
  Line,
  IconsContainer,
  IconsWrapper,
} from './Login-styled';
// import { PersonFill } from '@styled-icons/bootstrap/PersonFill';
// import { Lock } from '@styled-icons/fa-solid/Lock';
// import { EyeOutline } from '@styled-icons/evaicons-outline/EyeOutline';
// import { Google } from '@styled-icons/fa-brands/Google';
// import { FacebookF } from '@styled-icons/fa-brands/FacebookF';
// import { Apple } from '@styled-icons/fa-brands/Apple';
import '@fontsource/montserrat';

const Login = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [passwordShown] = useState(false);

  const onEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setUserPassword(e.target.value);
  };

  // const togglePassword = () => {
  //   setPasswordShown(!passwordShown);
  // };

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(new FormData(event.target));
  };

  return (
    <>
      <LoginTitle>
        Witaj w <GreenTextWrapper>B</GreenTextWrapper>ookify!
      </LoginTitle>
      <TextSpan>
        Zaloguj się, aby uzyskać dostęp do wszystkich funkcjonalności.
      </TextSpan>
      <form onSubmit={onSubmit}>
        <UserInputWrapper>
          {/* <DarkIconStyleWrapper>
            <PersonFill size="18" />
          </DarkIconStyleWrapper> */}
          <UserInput
            type="email"
            name="username"
            autoComplete="username"
            placeholder="Adres email"
            value={userEmail}
            onChange={onEmailChange}
          />
        </UserInputWrapper>
        <UserInputWrapper>
          {/* <DarkIconStyleWrapper>
            <Lock size="18" />
          </DarkIconStyleWrapper> */}
          <UserInput
            type={passwordShown ? 'text' : 'password'}
            name="password"
            autoComplete="password"
            placeholder="Hasło"
            value={userPassword}
            onChange={onPasswordChange}
          />
          {/* <DarkEyeStyleWrapper onClick={togglePassword}>
            <EyeOutline size="24" />
          </DarkEyeStyleWrapper> */}
        </UserInputWrapper>
        <PrimaryButton type="submit" name="submit">
          Zaloguj się
        </PrimaryButton>
      </form>
      <DividerWrapper>
        <Line />
        LUB
        <Line />
      </DividerWrapper>
      <IconsContainer>
        <IconsWrapper>
          {/* <GoogleIconStyleWrapper>
            <Google size="35" />
          </GoogleIconStyleWrapper> */}
        </IconsWrapper>
        <IconsWrapper>
          {/* <FacebookIconStyleWrapper>
            <FacebookF size="35" />
          </FacebookIconStyleWrapper> */}
        </IconsWrapper>
        <IconsWrapper>
          {/* <AppleIconStyleWrapper>
            <Apple size="35" />
          </AppleIconStyleWrapper> */}
        </IconsWrapper>
      </IconsContainer>
    </>
  );
};

export default Login;
