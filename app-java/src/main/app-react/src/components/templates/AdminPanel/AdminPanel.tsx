import { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { LinksContext } from '../../../providers/LinksProvider';
import { toast } from 'react-toastify';
import axios from 'axios';

import ListItem from '../../molecules/ListItem/ListItem';
import Header from '../../molecules/Headers/Header/Header';
import Footer from '../../molecules/Footer/Footer';
import Select from '../../atoms/Select/Select';
import {
  AdminPanelWrapper,
  AdminPanelContent,
  AdminPanelContentHeader,
  AdminPanelContentHeaderTitle,
  AdminPanelContentHeaderDescription,
  AdminPanelContentList,
  AdminPanelContentListNoItems,
} from './AdminPanel-styled';

type SelectOptionType =
  | 'aquariumTemplate'
  | 'knowledgeBase'
  | 'fishType'
  | 'accessoryType'
  | 'decoratorType';

const AdminPanel = () => {
  const LinksCtx = useContext(LinksContext);
  const [aquariumTemplates, setAquariumTemplates] = useState<any[]>([]);
  const [knowledgeBase, setKnowledgeBase] = useState<any[]>([]);
  const [fishTypes, setFishTypes] = useState<any[]>([]);
  const [accessoryTypes, setAccessoryTypes] = useState<any[]>([]);
  const [decoratorTypes, setDecoratorTypes] = useState<any[]>([]);

  const {
    register,
    watch,
    formState: { errors },
  } = useForm();

  const selectedDataType: SelectOptionType = watch('dataType');
  const selectComponentOptions = [
    {
      label: 'Szablony akwarium',
      value: 'aquariumTemplate',
    },
    {
      label: 'Baza wiedzy',
      value: 'knowledgeBase',
    },
    {
      label: 'Rodzaje ryb',
      value: 'fishType',
    },
    {
      label: 'Rodzaje akcesoriów',
      value: 'accessoryType',
    },
    {
      label: 'Typy dekoracji',
      value: 'decoratorType',
    },
  ];

  const getActiveDataType = () => {
    if (selectedDataType === 'aquariumTemplate') {
      return aquariumTemplates;
    }
    if (selectedDataType === 'knowledgeBase') {
      return knowledgeBase;
    }
    if (selectedDataType === 'fishType') {
      return fishTypes;
    }
    if (selectedDataType === 'accessoryType') {
      return accessoryTypes;
    }
    return null;
  };

  const onLogoutHandler = async () => {
    window.location.href = '/';
  };

  const onItemEditHandler = async (variant: SelectOptionType) => {
    console.log('onEditDecoratorHandler', variant);
  };

  useEffect(() => {
    const getAllAquariumTemplates = async () => {
      if (!LinksCtx || !LinksCtx.admin) {
        return;
      }
      const response = await axios.get(LinksCtx.admin.getAllAquariumTemplate);
      setAquariumTemplates(response.data.content);
    };

    const getAllFishTypes = async () => {
      if (!LinksCtx || !LinksCtx.admin) {
        return;
      }
      const response = await axios.get(LinksCtx.admin.getAllFishType);
      setFishTypes(response.data.content);
    };

    const getAllKnowledgeBase = async () => {
      if (!LinksCtx || !LinksCtx.admin) {
        return;
      }
      const response = await axios.get(LinksCtx.admin.getAllKnowledge);
      setKnowledgeBase(response.data.content);
    };

    const getAllAccessoryTypes = async () => {
      if (!LinksCtx || !LinksCtx.admin) {
        return;
      }
      const response = await axios.get(LinksCtx.admin.getAllAccessoryType);
      setAccessoryTypes(response.data.content);
    };

    const getAllDecoratorTypes = async () => {
      if (!LinksCtx || !LinksCtx.admin) {
        return;
      }
      const response = await axios.get(LinksCtx.admin.getAllDecoratorType);
      setDecoratorTypes(response.data.content);
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
      <AdminPanelContent>
        <AdminPanelContentHeader>
          <AdminPanelContentHeaderTitle>
            Witaj w panelu Administratora!
          </AdminPanelContentHeaderTitle>
          <AdminPanelContentHeaderDescription>
            Wybierz typ danych, które chcesz edytować
          </AdminPanelContentHeaderDescription>
          <Select
            options={selectComponentOptions}
            register={register}
            error={errors}
            id="dataType"
            validators={{}}
          />
        </AdminPanelContentHeader>
        <AdminPanelContentList>
          {getActiveDataType()?.length ? (
            <ListItem
              variant={selectedDataType}
              data={getActiveDataType()}
              onEditClick={onItemEditHandler}
            />
          ) : (
            <AdminPanelContentListNoItems>
              Nie znaleziono żadnych danych z wybranej kolekcji.
            </AdminPanelContentListNoItems>
          )}
        </AdminPanelContentList>
      </AdminPanelContent>
      <Footer />
    </AdminPanelWrapper>
  );
};

export default AdminPanel;
