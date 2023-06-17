import { useState, useEffect, useContext } from 'react';
import { LinksContext } from '../../../providers/LinksProvider';
import axios from 'axios';

import Button from '../../atoms/Button/Button';
import Modal from '../../molecules/Modal/Modal';
import { toast } from 'react-toastify';
import {
  AquariumResumeModalContainer,
  AquariumResumeModalHeader,
  AquariumResumeModalHeaderColor,
  AquariumResumeModalActions,
  AquariumResumeModalInputs,
} from './AquariumResumeModal-styled';

interface AquariumResumeModalProps {
  showModal: boolean;
  setShowModal: (prev: any) => void;
  id: number;
}

const AquariumResumeModal = ({
  showModal,
  setShowModal,
  id,
}: AquariumResumeModalProps) => {
  const LinksCtx = useContext(LinksContext);

  const [parametersList, setParametersList] = useState<any>({});

  useEffect(() => {
    const getAllParametersHistory = async () => {
      if (
        !LinksCtx ||
        !LinksCtx.user ||
        !LinksCtx.user.getAllParametersHistory
      ) {
        return;
      }

      const requestUrl = `${LinksCtx.user.getAllParametersHistory.replace(
        '/{aquariumId}',
        ''
      )}/${id}`;

      const response = await axios.get(requestUrl);
      if (
        !response.data ||
        !response.data._embedded ||
        !response.data._embedded.uiParametersHistoryList
      ) {
        toast.error('Pobieranie listy parametrów wody się nie powiodło');
        return;
      }
      setParametersList(response.data._embedded.uiParametersHistoryList);
    };

    getAllParametersHistory();
  }, [LinksCtx, id]);

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <AquariumResumeModalContainer>
        <AquariumResumeModalHeader>
          Sprawdź historię parametrów wody
          <AquariumResumeModalHeaderColor>
            {' '}
            akwarium!
          </AquariumResumeModalHeaderColor>
        </AquariumResumeModalHeader>
        <AquariumResumeModalInputs>
          {parametersList &&
            parametersList.length &&
            parametersList.map(
              (
                {
                  gh,
                  kh,
                  no2,
                  no3,
                  ph,
                  timestamp,
                }: {
                  gh: number;
                  kh: number;
                  no2: number;
                  no3: number;
                  ph: number;
                  timestamp: string;
                },
                index: number
              ) => {
                return (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      border: '1px solid black',
                      padding: '15px',
                    }}
                    key={index}
                  >
                    <h3 style={{ marginTop: '0px' }}>
                      Timestamp parametrów {timestamp}
                    </h3>
                    <span>GH: {gh}</span>
                    <span>KH: {kh}</span>
                    <span>NO2: {no2}</span>
                    <span>NO3: {no3}</span>
                    <span>PH: {ph}</span>
                  </div>
                );
              }
            )}
        </AquariumResumeModalInputs>
        <AquariumResumeModalActions>
          <Button text="Wyjdź" type="submit" />
        </AquariumResumeModalActions>
      </AquariumResumeModalContainer>
    </Modal>
  );
};

export default AquariumResumeModal;
