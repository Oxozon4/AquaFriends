import { useState, useEffect, useContext } from 'react';
import { LinksContext } from '../../../providers/LinksProvider';

import Header from '../../molecules/Headers/Header/Header';
import Footer from '../../molecules/Footer/Footer';
import { AdminPanelWrapper, AdminPanelContent } from './AdminPanel-styled';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminPanel = () => {
  const LinksCtx = useContext(LinksContext);

  const [aquariumTemplates, setAquariumTemplates] = useState<any[]>([]);
  const [knowledgeBase, setKnowledgeBase] = useState<any[]>([]);
  const [fishTypes, setFishTypes] = useState<any[]>([]);
  const [accessoryTypes, setAccessoryTypes] = useState<any[]>([]);
  const [decoratorTypes, setDecoratorTypes] = useState<any[]>([]);

  const onLogoutHandler = async () => {
    window.location.href = '/';
  };

  useEffect(() => {
    const getAllAquariumTemplates = async () => {
      if (!LinksCtx || !LinksCtx.admin) {
        return;
      }
      const response = await axios.get(LinksCtx.admin.getAllAquariumTemplate);
      setAquariumTemplates(response.data);
    };

    const getAllFishTypes = async () => {
      if (!LinksCtx || !LinksCtx.admin) {
        return;
      }
      const response = await axios.get(LinksCtx.admin.getAllFishType);
      setFishTypes(response.data);
    };

    const getAllKnowledgeBase = async () => {
      if (!LinksCtx || !LinksCtx.admin) {
        return;
      }
      const response = await axios.get(LinksCtx.admin.getAllKnowledge);
      setKnowledgeBase(response.data);
    };

    const getAllAccessoryTypes = async () => {
      if (!LinksCtx || !LinksCtx.admin) {
        return;
      }
      const response = await axios.get(LinksCtx.admin.getAllAccessoryType);
      setAccessoryTypes(response.data);
    };

    const getAllDecoratorTypes = async () => {
      if (!LinksCtx || !LinksCtx.admin) {
        return;
      }
      const response = await axios.get(LinksCtx.admin.getAllDecoratorType);
      setDecoratorTypes(response.data);
    };

    if (!LinksCtx || !LinksCtx.admin || LinksCtx.getAdminLinks === null) {
      return;
    }
    if (LinksCtx.admin.isSet) {
      try {
        getAllAquariumTemplates();
        getAllFishTypes();
        getAllKnowledgeBase();
        getAllAccessoryTypes();
        getAllDecoratorTypes();
      } catch (err) {
        toast.error('Wystąpił błąd podczas pobierania danych');
        console.warn(err);
      }
    } else {
      LinksCtx.getAdminLinks();
    }
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
