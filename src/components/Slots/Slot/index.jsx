// libraries
import { lazy, Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';
import isEmpty from 'lodash.isempty';
// components
import Workers from '../../Workers';
import Spinner from '../../common/Spinner';

const Popup = lazy(() => import('../../Popup'));

const Slot = ({ slot, workers }) => {
  const { t } = useTranslation(['slots', 'common']);
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
      <button aria-label="Time slot" data-testid="slot" className="default-button slot" onClick={openPopup}>
        <div>
          {t('common:time')} <span className="price">{localisedTime}</span>
        </div>
        <div>
          {t('common:price')} <span className="price">{price}</span>
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
