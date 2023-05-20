import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Aos from 'aos';

import Loader from '../../atoms/Loader/Loader';
import LoginHeader from '../../molecules/Headers/LoginHeader/LoginHeader';
import Footer from '../../molecules/Footer/Footer';
import WelcomeSection from '../../organisms/WelcomeSection/WelcomeSection';
import WhyUsSection from '../../organisms/WhyUsSection/WhyUsSection';
import TryForFreeSection from '../../organisms/TryForFreeSection/TryForFreeSection';
import BackToTopIcon from '../../atoms/BackToTopIcon/BackToTopIcon';
import LoginModal from '../../organisms/LoginModal/LoginModal';
import { Wrapper } from './LandingPage-styled';
import 'aos/dist/aos.css';

const LandingPage: React.FC = () => {
  const [isLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const loginModalVariantRef = useRef<'login' | 'register'>('login');

  const onLoginClick = () => {
    loginModalVariantRef.current = 'login';
    setShowModal(true);
  };

  const onRegisterClick = () => {
    loginModalVariantRef.current = 'register';
    setShowModal(true);
  };

  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <Wrapper>
        <Loader isLoading={isLoading} />
        <LoginHeader
          loginHandler={onLoginClick}
          registerHandler={onRegisterClick}
        />
        <WelcomeSection />
        <WhyUsSection />
        <TryForFreeSection onButtonClickHandler={onRegisterClick} />
        <BackToTopIcon />
        <Footer />
      </Wrapper>
      {showModal &&
        createPortal(
          <LoginModal
            variant={loginModalVariantRef.current}
            showModal={showModal}
            setShowModal={setShowModal}
          />,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          document.getElementById('modal-root')!
        )}
    </>
  );
};

export default LandingPage;
