import { createPortal } from 'react-dom';
import { useState, useRef, useEffect, useContext, useCallback } from 'react';
import { set, useForm } from 'react-hook-form';
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
import AccessoryModal from '../../organisms/AccessoryModal/AccessoryModal';
import DecoratorModal from '../../organisms/DecoratorModal/DecoratorModal';
import {
  AdminPanelWrapper,
  AdminPanelContent,
  AdminPanelContentHeader,
  AdminPanelContentHeaderTitle,
  AdminPanelContentHeaderDescription,
  AdminPanelContentList,
} from './AdminPanel-styled';

export type SelectOptionType =
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
  const itemIdRef = useRef<number>(0);

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
      label: 'Gatunki ryb',
      value: 'fishType',
    },
    {
      label: 'Rodzaje akcesoriów',
      value: 'accessoryType',
    },
    {
      label: 'Rodzaje dekoracji',
      value: 'decoratorType',
    },
    {
      label: 'Podpowiedzi',
      value: 'knowledgeBase',
    },
  ];

  const onLogoutHandler = async () => {
    window.location.href = '/';
  };

  const onItemEditHandler = (id: number) => {
    console.log('onEditDecoratorHandler', id);
    modalVariantRef.current = 'edit';
    itemIdRef.current = id;
    setShowModal(true);
  };

  const onItemCreateClickHandler = () => {
    modalVariantRef.current = 'create';
    setShowModal(true);
  };

  const getActiveDataType = useCallback(() => {
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
  }, [
    accessoryTypes,
    aquariumTemplates,
    decoratorTypes,
    fishTypes,
    knowledgeBase,
    selectedDataType,
  ]);

  const renderModal = useCallback(() => {
    const mappedData =
      modalVariantRef.current === 'create'
        ? []
        : getActiveDataType()?.find((item) => item.id === itemIdRef.current);
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
        <AccessoryModal
          setShowModal={setShowModal}
          showModal={showModal}
          data={mappedData}
        />
      );
    }
    if (selectedDataType === 'decoratorType') {
      return (
        <DecoratorModal
          setShowModal={setShowModal}
          showModal={showModal}
          data={mappedData}
        />
      );
    }
    return [];
  }, [getActiveDataType, selectedDataType, showModal]);

  const getAllAquariumTemplates = useCallback(async () => {
    if (!LinksCtx || !LinksCtx.admin) {
      return;
    }
    const response = await axios.get(LinksCtx.admin.getAllAquariumTemplate);
    setAquariumTemplates(response.data.content);
  }, [LinksCtx]);

  const getAllFishTypes = useCallback(async () => {
    if (!LinksCtx || !LinksCtx.admin) {
      return;
    }
    const response = await axios.get(LinksCtx.admin.getAllFishType);
    if (
      response.data &&
      response.data._embedded &&
      response.data._embedded.uiFishTypeList
    ) {
      setFishTypes(response.data._embedded.uiFishTypeList);
    }
  }, [LinksCtx]);

  const getAllKnowledgeBase = useCallback(async () => {
    if (!LinksCtx || !LinksCtx.admin) {
      return;
    }
    const response = await axios.get(LinksCtx.admin.getAllKnowledge);
    if (
      response.data &&
      response.data._embedded &&
      response.data._embedded.uiKnowledgeList
    ) {
      setKnowledgeBase(response.data._embedded.uiKnowledgeList);
    }
  }, [LinksCtx]);

  const getAllAccessoryTypes = useCallback(async () => {
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
  }, [LinksCtx]);

  const getAllDecoratorTypes = useCallback(async () => {
    if (!LinksCtx || !LinksCtx.admin) {
      return;
    }
    const response = await axios.get(LinksCtx.admin.getAllDecoratorType);
    if (
      response.data &&
      response.data._embedded &&
      response.data._embedded.uiDecoratorTypeList
    ) {
      setDecoratorTypes(response.data._embedded.uiDecoratorTypeList);
    }
  }, [LinksCtx]);

  useEffect(() => {
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
  }, [
    LinksCtx,
    getAllAccessoryTypes,
    getAllAquariumTemplates,
    getAllDecoratorTypes,
    getAllFishTypes,
    getAllKnowledgeBase,
  ]);

  useEffect(() => {
    if (!LinksCtx || !LinksCtx.admin) {
      return;
    }
    setTimeout(() => {
      if (selectedDataType === 'aquariumTemplate') {
        getAllAquariumTemplates();
      } else if (selectedDataType === 'knowledgeBase') {
        getAllKnowledgeBase();
      } else if (selectedDataType === 'fishType') {
        getAllFishTypes();
      } else if (selectedDataType === 'accessoryType') {
        getAllAccessoryTypes();
      } else if (selectedDataType === 'decoratorType') {
        getAllDecoratorTypes();
      }
    }, 150);
  }, [
    LinksCtx,
    getAllAccessoryTypes,
    getAllAquariumTemplates,
    getAllDecoratorTypes,
    getAllFishTypes,
    getAllKnowledgeBase,
    selectedDataType,
    showModal,
  ]);

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
              itemVariant={selectedDataType}
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
