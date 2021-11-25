import { lazy, Suspense } from 'react';
import { useState } from 'react';
import isEmpty from 'lodash.isempty';
import Workers from '../Workers';
import Spinner from '../common/Spinner';

const Popup = lazy(() => import('../Popup'));

const Slot = ({ slot, workers }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const { price, localisedTime } = slot || {};

  if (isEmpty(slot)) {
    return null;
  }

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <>
      <button data-testid="slot" className="default-button slot" onClick={openPopup}>
        <div>
          Time: <span className="price">{localisedTime}</span>
        </div>
        <div>
          Price: <span className="price">{price}</span>
        </div>
      </button>

      <Suspense fallback={<Spinner />}>
        <Popup isOpened={isPopupOpen} onClose={closePopup}>
          <div className="booking-panel">
            <Workers workers={workers} slotId={slot.id} />
          </div>
        </Popup>
      </Suspense>
    </>
  );
};

export default Slot;
