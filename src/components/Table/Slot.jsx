import {useState} from 'react';
import isEmpty from 'lodash.isempty';
import Popup from '../Popup';
import Workers from '../Workers';

const Slot = ({slot, workers}) => {
    const [isPopupOpen, setPopupOpen] = useState(false)
  const {price, localisedTime} = slot || {};

  if (isEmpty(slot)) {
    return null;
  }

const openPopup = () => {
  setPopupOpen(true)
}

const closePopup = () => {
  setPopupOpen(false)
}

  return (
    <>
  <div data-testid="slot" className="slot" type='button' onClick={openPopup}>
  <div>Time: <span className="price">{localisedTime}</span></div>
  <div>Price: <span className="price">{price}</span></div>
  </div>

  <Popup isOpened={isPopupOpen} onClose={closePopup}>
    <div className="booking-panel">
    <Workers workers={workers} slotId={slot.id}/>
    </div>
    </Popup>
  </>
  )
}

export default Slot;