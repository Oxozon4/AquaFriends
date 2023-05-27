import { useEffect, useContext } from 'react';
import { LinksContext } from '../../../providers/LinksProvider';

import Header from '../../molecules/Headers/Header/Header';
import Footer from '../../molecules/Footer/Footer';
import { AdminPanelWrapper, AdminPanelContent } from './AdminPanel-styled';

const AdminPanel = () => {
  const LinksCtx = useContext(LinksContext);

  const onLogoutHandler = async () => {
    window.location.href = '/';
  };

  useEffect(() => {
    if (
      !LinksCtx ||
      !LinksCtx.admin ||
      LinksCtx.admin.isSet ||
      LinksCtx.getAdminLinks === null
    ) {
      return;
    }
    LinksCtx.getAdminLinks();
  }, [LinksCtx]);

  return (
    <AdminPanelWrapper>
      <Header
        onClickHandler={onLogoutHandler}
        logoHref="/dashboard"
        text="wyloguj się"
      />
      <AdminPanelContent>Sudo!</AdminPanelContent>
      <Footer />
    </AdminPanelWrapper>
  );
};

export default AdminPanel;
