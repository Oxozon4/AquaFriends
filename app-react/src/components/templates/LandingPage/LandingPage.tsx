import { useState, useEffect } from 'react';
import { Wrapper, Header, Logo, IconStyleWrapper } from './LandingPage-styled';
import Modal from '../../molecules/Modal/Modal';
import Login from '../../organisms/Login/Login';
import Footer from '../../molecules/Footer/Footer';
import Loader from '../../atoms/Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import '@fontsource/montserrat';
import 'react-toastify/dist/ReactToastify.css';

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  useEffect(() => {
    const queryParams = window.location.search;
    if (queryParams) {
      switch (queryParams) {
        case '?login=true':
          setShowModal(true);
          break;
        case '?error=true':
          setShowModal(true);
          toast.error('Podane dane logowania są nieprawidłowe.');
          break;
        default:
          break;
      }
    }
    setIsLoading(false);
  }, []);

  return (
    <Wrapper>
      {isLoading ? <Loader isLoading={isLoading} /> : ''}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <Login />
      </Modal>
      <Header>
        <Logo>AquaFriends</Logo>
        <IconStyleWrapper onClick={openModal} />
      </Header>
      <h1>Przepraszamy!</h1>
      <h2>Dla obecnie ustawionych filtrów nie posiadamy żadnych akwariów!</h2>
      <Footer />
    </Wrapper>
  );
};

export default LandingPage;
