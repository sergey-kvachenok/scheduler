// libraries
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// components
import Worker from './Worker';

const Workers = ({ workers, slotId }) => {
  const { t } = useTranslation('slots');
  const { slots = [] } = useSelector(({ basket }) => basket || {});

  const hasBasketItems = !!slots.length;

  return (
    <div className="workers-wrapper">
      <div className="header-container">
        <h3 className="modal-title">{t('workers.title')}</h3>

        {hasBasketItems && (
          <Link to="/basket" className="secondary-text">
            {t('workers.basketLink')}
          </Link>
        )}
      </div>

      <ul className="list">
        {workers.map(worker => (
          <Worker key={worker.id} worker={worker} slotId={slotId} />
        ))}
      </ul>
    </div>
  );
};

export default Workers;
