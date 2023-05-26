import Header from '../../molecules/Headers/Header/Header';
import Footer from '../../molecules/Footer/Footer';
import { AdminPanelWrapper, AdminPanelContent } from './AdminPanel-styled';

const AdminPanel = () => {
  const onLogoutHandler = async () => {
    window.location.href = '/';
  };

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
