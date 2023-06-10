import { createPortal } from 'react-dom';
import { useState, useRef, useEffect, useContext, useCallback } from 'react';
import { LinksContext } from '../../../providers/LinksProvider';
import axios from 'axios';
import { toast } from 'react-toastify';

import AquariumModal from '../../organisms/AquariumModal/AquariumModal';
import Header from '../../molecules/Headers/Header/Header';
import FormsListSection from '../../organisms/ItemListSection/ItemListSection';
import Footer from '../../molecules/Footer/Footer';
import { DashboardWrapper } from './Dashboard-styled';

type AquariumType = {
  accessories: any[];
  decorators: any[];
  fishes: any[];
  id: number;
  height: number;
  width: number;
  length: number;
  name: string;
}[];

const Dashboard: React.FC = () => {
  const LinksCtx = useContext(LinksContext);
  const [allAquariums, setAllAquariums] = useState<AquariumType | []>([]);
  const [showModal, setShowModal] = useState(false);

  const modalVariantRef = useRef<'create' | 'edit'>('create');
  const itemIdRef = useRef<number>(0);

  const onLogoutHandler = async () => {
    window.location.href = '/';
  };

  const onEditHandler = () => {
    setShowModal(true);
  };

  const onCreateNewHandler = () => {
    setShowModal(true);
  };

  const renderModal = () => {
    const mappedAquariumData =
      modalVariantRef.current === 'create'
        ? []
        : allAquariums?.find((item) => item.id === itemIdRef.current);
    return (
      <AquariumModal
        showModal={showModal}
        setShowModal={setShowModal}
        aquariumData={mappedAquariumData}
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
  }, [LinksCtx, getAllAquariums]);

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
