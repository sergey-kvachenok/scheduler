// libraries
import { useState, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
// components
import { ReactComponent as TrashIcon } from '../../../assets/icons/trash-bin.svg';
import { removeSlot, removeWorker } from '../../../store/basketSlice';
import Confirmation from '../Confirmation';
import Spinner from '../../common/Spinner';
// constants
import { keyCodes, entities } from '../../../constants';

const Popup = lazy(() => import('../../Popup'));

const Wrapper = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  margin-bottom: 20px;
  padding: 10px;

  .slot-info {
    display: flex;
    align-items: center;
  }

  .time {
    margin-right: 30px;
  }

  .remove-button {
    margin-right: 0;
    margin-left: auto;
  }

  .workers-title,
  .total {
    font-weight: bolder;
  }

  .price {
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

const WorkersContainer = styled.ul`
  list-style: none;

  .worker {
    align-items: center;
    display: flex;
    margin-bottom: 15px;
  }

  .trash-icon {
    cursor: pointer;
    height: 24px;
    fill: ${({ theme }) => theme.colors.coral};

    &:hover,
    &:active {
      outline: none;
      fill: ${({ theme }) => theme.colors.red};
    }
  }
`;

const priceToNumber = price => Number(price.replace(/[£]/, ''));

const Item = ({ slot, workers }) => {
  const { t } = useTranslation(['basket', 'common']);
  const dispatch = useDispatch();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [deleletionInfo, setDeletionInfo] = useState(null);
  const { price, localisedTime } = slot;

  const total = workers.length * priceToNumber(slot.price);

  const openPopup = (id, name, entity) => {
    setPopupOpen(true);
    setDeletionInfo({ id, name, entity });
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const deleteEntity = () => {
    const slotId = slot.id;
    const { entity, id } = deleletionInfo;
    const isSlot = entity === entities.slot;

    if (isSlot) {
      dispatch(removeSlot({ slotId }));
    } else {
      dispatch(removeWorker({ slotId, workerId: id }));
    }

    setPopupOpen(false);
  };

  const getPopupMessage = () => {
    if (!deleletionInfo) return;

    const { entity, name } = deleletionInfo;
    const isSlot = entity === entities.slot;

    return isSlot ? t('removeSlotConfirmation', { time: name }) : t('removeWorkerConfirmation', { name });
  };

  const handleKeyPress = (event, id) => {
    const { keyCode } = event;

    if (keyCode === keyCodes.SPACE || keyCode === keyCodes.ENTER) {
      openPopup(id, 'worker');
    }
  };

  const workersContent = workers.map(({ name, id }) => (
    <li key={id} className="worker">
      <div className="name">{name}</div>
      <TrashIcon
        tabIndex="0"
        role="button"
        aria-label="Remove worker from the basket"
        data-testid="remove-worker"
        className="remove-button trash-icon"
        onKeyDown={event => handleKeyPress(event, id)}
        onClick={() => {
          openPopup(id, name, 'worker');
        }}
      />
    </li>
  ));

  return (
    <>
      <Wrapper>
        <div className="slot-info">
          <div className="time">
            {t('common:time')} {localisedTime}
          </div>
          <div>
            {t('pricePerPerson')} <span className="price">{price}</span>
          </div>
          <button
            data-testid="remove-slot"
            aria-label="Remove slot with all workers from the basket"
            className="default-button remove-button primary"
            onClick={() => {
              openPopup(slot.id, slot.localisedTime, 'slot');
            }}
          >
            {t('common:remove')}
          </button>
        </div>
        <p className="workers-title">{t('booked')}</p>

        <WorkersContainer>{workersContent}</WorkersContainer>

        <div className="total">
          {t('totalPerSlot')} <span className="price">£{total}</span>
        </div>
      </Wrapper>

      <Suspense fallback={<Spinner />}>
        <Popup isOpened={isPopupOpen} onClose={closePopup}>
          <Confirmation text={getPopupMessage()} cancel={closePopup} confirm={deleteEntity} />
        </Popup>
      </Suspense>
    </>
  );
};

export default Item;
