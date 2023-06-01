import { createPortal } from 'react-dom';
import { useState, useRef, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { LinksContext } from '../../../providers/LinksProvider';
import { toast } from 'react-toastify';
import axios from 'axios';

import ItemListSection from '../../organisms/ItemListSection/ItemListSection';
import Header from '../../molecules/Headers/Header/Header';
import Footer from '../../molecules/Footer/Footer';
import Select from '../../atoms/Select/Select';
import KnowledgeBaseModal from '../../organisms/KnowledgeBaseModal/KnowledgeBaseModal';
import FishTypeModal from '../../organisms/FishTypeModal/FishTypeModal';
import AquariumTemplateModal from '../../organisms/AquariumTemplateModal/AquariumTemplateModal';
import AccessoryTypeModal from '../../organisms/AccessoryModal/AccessoryModal';
import DecoratorTypeModal from '../../organisms/DecoratorModal/DecoratorModal';
import {
  AdminPanelWrapper,
  AdminPanelContent,
  AdminPanelContentHeader,
  AdminPanelContentHeaderTitle,
  AdminPanelContentHeaderDescription,
  AdminPanelContentList,
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
  const [showModal, setShowModal] = useState(false);

  const modalVariantRef = useRef<'create' | 'edit'>('create');

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
      label: 'Podpowiedzi',
      value: 'knowledgeBase',
    },
    {
      label: 'Gatunek ryb',
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

  const onLogoutHandler = async () => {
    window.location.href = '/';
  };

  const onItemEditHandler = (variant: SelectOptionType) => {
    console.log('onEditDecoratorHandler', variant);
  };

  const onItemCreateClickHandler = () => {
    setShowModal(true);
  };

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
    if (selectedDataType === 'decoratorType') {
      return decoratorTypes;
    }
    return null;
  };

  const renderModal = () => {
    const mappedData =
      modalVariantRef.current === 'create' ? [] : getActiveDataType();
    if (selectedDataType === 'aquariumTemplate') {
      return (
        <AquariumTemplateModal
          setShowModal={setShowModal}
          showModal={showModal}
          data={mappedData}
        />
      );
    }
    if (selectedDataType === 'knowledgeBase') {
      return (
        <KnowledgeBaseModal
          setShowModal={setShowModal}
          showModal={showModal}
          data={mappedData}
        />
      );
    }
    if (selectedDataType === 'fishType') {
      return (
        <FishTypeModal
          setShowModal={setShowModal}
          showModal={showModal}
          data={mappedData}
        />
      );
    }
    if (selectedDataType === 'accessoryType') {
      return (
        <AccessoryTypeModal
          setShowModal={setShowModal}
          showModal={showModal}
          data={mappedData}
        />
      );
    }
    if (selectedDataType === 'decoratorType') {
      return (
        <DecoratorTypeModal
          setShowModal={setShowModal}
          showModal={showModal}
          data={getActiveDataType()}
        />
      );
    }
    return null;
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
      if (
        response.data &&
        response.data._embedded &&
        response.data._embedded.uiAccessoryTypeList
      ) {
        setAccessoryTypes(response.data._embedded.uiAccessoryTypeList);
      }
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
    <>
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
            <ItemListSection
              data={getActiveDataType()}
              onEditHandler={onItemEditHandler}
              onCreateNewHandler={onItemCreateClickHandler}
            />
          </AdminPanelContentList>
        </AdminPanelContent>
        <Footer />
      </AdminPanelWrapper>
      {showModal &&
        createPortal(renderModal(), document.getElementById('modal-root')!)}
    </>
  );
};

export default AdminPanel;
