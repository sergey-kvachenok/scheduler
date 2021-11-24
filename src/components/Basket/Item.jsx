import { useState } from 'react';
import styled from 'styled-components'
import { useDispatch, useSelector } from "react-redux";
import {ReactComponent as TrashIcon} from '../../assets/icons/trash-bin.svg'
import { removeSlot, removeWorker } from '../../store/basketSlice';
import Confirmation from './Confirmation';
import Popup from '../Popup';

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
`

const WorkersContainer = styled.ul`
 list-style: none;

 .worker {
   display: flex;
   margin-bottom: 15px;
 }

 .trash-icon {
   fill: ${({ theme }) => theme.colors.coral};

   &:hover,
   &:active {
      fill: ${({ theme }) => theme.colors.red};
   }
 }
`

const priceToNumber = (price) => Number(price.replace(/[£]/, ''))

const Item = ({slot, workers}) => {
  const dispatch = useDispatch()
  const [isPopupOpen, setPopupOpen] = useState(false)
  const [deleletionInfo, setDeletionInfo] = useState(null);
  const {price, localisedTime} = slot;

  const total = workers.length * priceToNumber(slot.price)

  const openPopup = (id, entity) => {
    setPopupOpen(true);
    setDeletionInfo({id, entity})
  }

  const closePopup = () => {setPopupOpen(false)}

  const deleteEntity = () => {
    const slotId = slot.id;
    const { entity, id } = deleletionInfo;
    const isSlot = entity === 'slot'

    if (isSlot) {
    dispatch(removeSlot({slotId}))
    } else{
    dispatch(removeWorker({slotId, workerId: id}))
    }

    setPopupOpen(false);
  }

  const workersContent = workers.map(({name, id}) => (<li className="worker">
  <div className="name">{name}</div>
  <TrashIcon
    className="remove-button trash-icon"
    onClick={() => {openPopup(id, 'worker')}}
    />
  </li>))

  return (
    <>
    <Wrapper>
      <div className="slot-info">
      <div className="time">Time: {localisedTime}</div>
       <div>Price per person: <span className="price">{price}</span></div>
       <button
        className="default-button remove-button primary"
        onClick={() => {openPopup(slot.id, 'slot')}}
        >Remove</button>
      </div>
      <p className="workers-title">You have booked:</p>

      <WorkersContainer>
        {workersContent}
      </WorkersContainer>
      
       <div className="total">
       Total per slot: <span className="price">£{total}</span>
       </div>
    </Wrapper>
    <Popup isOpened={isPopupOpen} closePopup={closePopup}>
    <Confirmation 
    text={`Would you like to delete current ${deleletionInfo?.entity}`}
    cancel={closePopup}
    confirm={deleteEntity}
    />
    </Popup>
    </>
  )
}

export default Item;
