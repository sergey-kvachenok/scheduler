// libraries
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
// components
import { addWorker, removeWorker } from '../../store/basketSlice';

const Worker = ({ worker, slotId }) => {
  const { t } = useTranslation('slots');
  const dispatch = useDispatch();

  const { slots } = useSelector(({ basket }) => basket || {});
  const currentSlotStoreInfo = slots.find(({ id }) => id === slotId) || {};
  const currentSlotStoreWorkers = currentSlotStoreInfo?.workers || [];

  const { isNew, name, rating, id } = worker;
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
