import { useDispatch, useSelector } from "react-redux";
import classnames from 'classnames';
import { addWorker } from "../../store/basketSlice";

const Workers = ({workers, slotId}) => {
  const dispatch = useDispatch()
  const { slots } = useSelector(({basket}) => basket || {});
  const currentSlotStoreInfo = slots.find(({id}) => id === slotId) || {};
  const currentSlotStoreWorkers = currentSlotStoreInfo?.workers || [];
 
  return (<div className='workers-wrapper'>
  <ul className="list">
  {workers.map(worker => {
    const {isNew, name, rating, id} = worker;
    const isButtonDisabled = currentSlotStoreWorkers.includes(id)

    return (<li data-testid="worker" key={id} className="list-item worker-container">
    <div className="info">
    <div className="name">{name}</div>
    <div className="raiting">{rating}</div>
    </div>
    <div className="manage">

    <button data-testid="add-worker" className={classnames("default-button", "add-worker", {
     "primary": !isButtonDisabled,
     "disabled": isButtonDisabled
    })}
    disabled={isButtonDisabled}
    onClick={() => {
      dispatch(addWorker({slotId, workerId: id}))
      }}
    >Add</button>
    </div>
    </li>)
  })}
  </ul>

  </div> )
}

export default Workers;