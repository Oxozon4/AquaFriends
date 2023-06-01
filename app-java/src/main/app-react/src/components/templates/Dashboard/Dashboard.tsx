import { useState, useEffect, useContext } from 'react';
import { LinksContext } from '../../../providers/LinksProvider';

import Header from '../../molecules/Headers/Header/Header';
import FormsListSection from '../../organisms/FormsListSection/FormsListSection';
import Footer from '../../molecules/Footer/Footer';
import { DashboardWrapper } from './Dashboard-styled';

const Dashboard: React.FC = () => {
  const LinksCtx = useContext(LinksContext);
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

  useEffect(() => {
    if (
      !LinksCtx ||
      !LinksCtx.user ||
      LinksCtx.user.isSet ||
      LinksCtx.getUserLinks === null
    ) {
      return;
    }
    LinksCtx.getUserLinks();
  }, [LinksCtx]);

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
    </>
  );
};

export default Dashboard;
