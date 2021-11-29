// libraries
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import Rating from '@mui/material/Rating';
// components
import { addWorker, removeWorker } from '../../store/basketSlice';

const Worker = ({ worker, slotId }) => {
  const { t } = useTranslation('slots');
  const dispatch = useDispatch();

  const { slots } = useSelector(({ basket }) => basket || {});
  const currentSlotStoreInfo = slots.find(({ id }) => id === slotId) || {};
  const currentSlotStoreWorkers = currentSlotStoreInfo?.workers || [];

  const { name, rating, id } = worker;
  const isWorkerInBasket = currentSlotStoreWorkers.includes(id);

  const buttonLabel = isWorkerInBasket ? 'Remove' : 'Add';

  const handleButtonClick = () => {
    const params = { slotId, workerId: id };
    const handler = isWorkerInBasket ? removeWorker : addWorker;

    dispatch(handler(params));
  };

  return (
    <li data-testid="worker" key={id} className="list-item worker-container">
      <div>
        <div>{name}</div>
        <div className="secondary-text rating">
          {`${t('workers.rating')} `}
          <Rating
            name="hover-feedback"
            style={{
              fontSize: '12px',
              margin: '0 5px',
            }}
            className="sizeSmall"
            value={Number(rating)}
            precision={0.1}
            readOnly
          />

          <span
            className={classnames({
              low: rating <= 3,
              middle: rating > 3 && rating <= 4,
              high: rating > 4,
            })}
          >
            {rating}
          </span>
        </div>
      </div>

      <div className="manage">
        <button
          data-testid="add-worker"
          aria-label="Add worker to the basket"
          className={classnames('default-button', {
            primary: !isWorkerInBasket,
            secondary: isWorkerInBasket,
          })}
          onClick={handleButtonClick}
        >
          {buttonLabel}
        </button>
      </div>
    </li>
  );
};

export default Worker;
