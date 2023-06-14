import { createPortal } from 'react-dom';
import { useState, useRef, useEffect, useContext, useCallback } from 'react';
import { LinksContext } from '../../../providers/LinksProvider';
import axios from 'axios';
import { toast } from 'react-toastify';

import AquariumModal from '../../organisms/AquariumModal/AquariumModal';
import Header from '../../molecules/Headers/Header/Header';
import FormsListSection from '../../organisms/ItemListSection/ItemListSection';
import Footer from '../../molecules/Footer/Footer';
import { DashboardContentHeader, DashboardContentHeaderDescription, DashboardContentHeaderTitle, DashboardWrapper } from './Dashboard-styled';
import ConfirmModal from '../../organisms/ConfirmModal/ConfirmModal';

export type AquariumType = {
  accessories: any[];
  decorators: any[];
  fishes: any[];
  id: number;
  height: number;
  width: number;
  length: number;
  name: string;
}[];

export type DecoratorType = {
  id: number;
  name: string;
  type: string;
};

export type FishType = {
  enemies: any[];
  id: number;
  name: string;
  maxGh: number;
  maxKh: number;
  maxNo2: number;
  maxNo3: number;
  maxPh: number;
  minGh: number;
  minKh: number;
  minNo2: number;
  minNo3: number;
};

export type AccessoryType = {
  id: number;
  name: string;
  volume: number;
};

const Dashboard: React.FC = () => {
  const LinksCtx = useContext(LinksContext);
  const [allAquariums, setAllAquariums] = useState<AquariumType | []>([]);
  const [aquariumTemplates, setAquariumTemplates] = useState<AquariumType>([]);
  const [decorator, setDecorators] = useState<DecoratorType[]>([]);
  const [fishTypes, setFishTypes] = useState<FishType[]>([]);
  const [accessories, setAccessories] = useState<AccessoryType[]>([]);
  const [showModal, setShowModal] = useState(false);

  const modalVariantRef = useRef<'create' | 'edit' | 'delete'>('create');
  const itemIdRef = useRef<number>(0);

  const onLogoutHandler = async () => {
    window.location.href = '/';
  };

  const onEditHandler = (id: number) => {
    itemIdRef.current = id;
    modalVariantRef.current = 'edit';
    setShowModal(true);
  };

  const onCreateNewHandler = () => {
    modalVariantRef.current = 'create';
    setShowModal(true);
  };

  const onDeleteHandler = (id: number) => {
    modalVariantRef.current = 'delete';
    itemIdRef.current = id;
    setShowModal(true);
  };

  const renderModal = () => {
    const mappedAquariumData =
      modalVariantRef.current === 'create'
        ? []
        : allAquariums?.find((item) => item.id === itemIdRef.current);

    if (modalVariantRef.current === 'delete') {
      return (
        <ConfirmModal
          setShowModal={setShowModal}
          showModal={showModal}
          id={itemIdRef.current}
        />
      );
    }
    return (
      <AquariumModal
        showModal={showModal}
        setShowModal={setShowModal}
        aquariumData={mappedAquariumData}
        aquariumTemplates={aquariumTemplates}
        fishTypes={fishTypes}
        accessories={accessories}
        decorators={decorator}
      />
    );
  };

  const getAllAquariums = useCallback(async () => {
    if (!LinksCtx || !LinksCtx.user || !LinksCtx.user.getAllAquarium) {
      return;
    }
    const response = await axios.get(LinksCtx.user.getAllAquarium);
    if (
      !response.data ||
      !response.data._embedded ||
      !response.data._embedded.uiAquariumList
    ) {
      toast.error(
        'Wystąpił problem z pobraniem listy akwariów. Spróbuj ponownie później!'
      );
      return;
    }
    setAllAquariums(response.data._embedded.uiAquariumList);
  }, [LinksCtx]);

  const getAllFishTypes = useCallback(async () => {
    if (!LinksCtx || !LinksCtx.user || !LinksCtx.user.getAllFishType) {
      return;
    }
    const response = await axios.get(LinksCtx.user.getAllFishType);
    if (
      !response.data ||
      !response.data._embedded ||
      !response.data._embedded.uiFishTypeList
    ) {
      toast.error(
        'Wystąpił problem z pobraniem listy akwariów. Spróbuj ponownie później!'
      );
      return;
    }
    setFishTypes(response.data._embedded.uiFishTypeList);
  }, [LinksCtx]);

  const getAllAquariumTemplates = useCallback(async () => {
    if (!LinksCtx || !LinksCtx.user || !LinksCtx.user.getAllAquariumTemplate) {
      return;
    }
    const response = await axios.get(LinksCtx.user.getAllAquariumTemplate);
    if (
      !response.data ||
      !response.data._embedded ||
      !response.data._embedded.uiAquariumTemplateList
    ) {
      toast.error(
        'Wystąpił problem z pobraniem listy akwariów. Spróbuj ponownie później!'
      );
      return;
    }
    setAquariumTemplates(response.data._embedded.uiAquariumTemplateList);
  }, [LinksCtx]);

  const getAllDecoratorTypes = useCallback(async () => {
    if (!LinksCtx || !LinksCtx.user || !LinksCtx.user.getAllDecoratorType) {
      return;
    }
    const response = await axios.get(LinksCtx.user.getAllDecoratorType);
    if (
      !response.data ||
      !response.data._embedded ||
      !response.data._embedded.uiDecoratorTypeList
    ) {
      toast.error(
        'Wystąpił problem z pobraniem listy akwariów. Spróbuj ponownie później!'
      );
      return;
    }
    setDecorators(response.data._embedded.uiDecoratorTypeList);
  }, [LinksCtx]);

  const getAllAccessoryTypes = useCallback(async () => {
    if (!LinksCtx || !LinksCtx.user || !LinksCtx.user.getAllAccessoryType) {
      return;
    }
    const response = await axios.get(LinksCtx.user.getAllAccessoryType);
    if (
      !response.data ||
      !response.data._embedded ||
      !response.data._embedded.uiAccessoryTypeList
    ) {
      toast.error(
        'Wystąpił problem z pobraniem listy akwariów. Spróbuj ponownie później!'
      );
      return;
    }
    setAccessories(response.data._embedded.uiAccessoryTypeList);
  }, [LinksCtx]);

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

  useEffect(() => {
    if (!LinksCtx || !LinksCtx.user || !LinksCtx.user.isSet) {
      return;
    }
    getAllAquariums();
    getAllFishTypes();
    getAllDecoratorTypes();
    getAllAccessoryTypes();
    getAllAquariumTemplates();
  }, [
    LinksCtx,
    getAllAccessoryTypes,
    getAllAquariumTemplates,
    getAllAquariums,
    getAllDecoratorTypes,
    getAllFishTypes,
  ]);

  useEffect(() => {
    if (!showModal) {
      getAllAquariums();
      getAllFishTypes();
      getAllDecoratorTypes();
      getAllAccessoryTypes();
      getAllAquariumTemplates();
    }
  }, [
    getAllAccessoryTypes,
    getAllAquariumTemplates,
    getAllAquariums,
    getAllDecoratorTypes,
    getAllFishTypes,
    showModal,
  ]);

  return (
    <>
      <DashboardWrapper>
        <Header
          onClickHandler={onLogoutHandler}
          logoHref="/dashboard"
          text="wyloguj się"
        />
        <DashboardContentHeader>
          <DashboardContentHeaderTitle>
            Witaj w AquaFriends!
          </DashboardContentHeaderTitle>
          <DashboardContentHeaderDescription>
            Najlepsza i jedyna w swoim rodzaju aplikacja do zarządzania akwariami!
          </DashboardContentHeaderDescription>
        </DashboardContentHeader>
        <FormsListSection
          onEditHandler={onEditHandler}
          onCreateNewHandler={onCreateNewHandler}
          onDeleteHandler={onDeleteHandler}
          itemVariant={'aquarium'}
          data={allAquariums}
        />
        <Footer />
      </DashboardWrapper>
      {showModal &&
        createPortal(renderModal(), document.getElementById('modal-root')!)}
    </>
  );
};

export default Dashboard;
