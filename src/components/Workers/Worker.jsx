import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import { addWorker } from '../../store/basketSlice';

const Worker = ({ worker, slotId }) => {
  const dispatch = useDispatch();
  const { slots } = useSelector(({ basket }) => basket || {});
  const currentSlotStoreInfo = slots.find(({ id }) => id === slotId) || {};
  const currentSlotStoreWorkers = currentSlotStoreInfo?.workers || [];

  const { isNew, name, rating, id } = worker;
  const isButtonDisabled = currentSlotStoreWorkers.includes(id);

  return (
    <li data-testid="worker" key={id} className="list-item worker-container">
      <div className="info">
        <div className="name">{name}</div>
        <div className="raiting">
          Rating:{' '}
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
            primary: !isButtonDisabled,
            disabled: isButtonDisabled,
          })}
          disabled={isButtonDisabled}
          onClick={() => {
            dispatch(addWorker({ slotId, workerId: id }));
          }}
        >
          Add
        </button>
      </div>
    </li>
  );
};

export default Worker;
