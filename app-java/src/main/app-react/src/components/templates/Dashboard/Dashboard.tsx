import { useState } from 'react';
import Header from '../../molecules/Headers/Header/Header';
import FormsListSection from '../../organisms/FormsListSection/FormsListSection';
import FormCreationModal from '../../organisms/FormCreationModal/FormCreationModal';
import Footer from '../../molecules/Footer/Footer';
import { DashboardWrapper } from './Dashboard-styled';
import { createPortal } from 'react-dom';

const Dashboard: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const onLogoutHandler = async () => {
    window.location.href = '/';
  };

  const onEditHandler = () => {
    setShowModal(true);
  };

  const onCreateNewHandler = () => {
    setShowModal(true);
  };

  return (
    <>
      <DashboardWrapper>
        <Header
          onClickHandler={onLogoutHandler}
          logoHref="/dashboard"
          text="wyloguj się"
        />
        <FormsListSection
          onEditHandler={onEditHandler}
          onCreateNewHandler={onCreateNewHandler}
        />
        <Footer />
      </DashboardWrapper>
      {showModal &&
        createPortal(
          <FormCreationModal
            showModal={showModal}
            setShowModal={setShowModal}
          />,
          document.getElementById('modal-root')!
        )}
    </>
  );
};

export default Dashboard;
