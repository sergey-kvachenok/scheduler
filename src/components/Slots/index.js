// libraries
import { useTranslation } from 'react-i18next';
// components
import Slot from './Slot';
import Error from '../common/Error';
import Spinner from '../common/Spinner';
// hooks
import useSlotInfo from '../../hooks/useSlotInfo';

const Slots = () => {
  const { t } = useTranslation('slots');
  const [slotInfo, isFetching, error] = useSlotInfo();

  if (isFetching) {
    return <Spinner loadingText={t('spinner')} />;
  }

  const content = error ? (
    <Error message={error?.message} />
  ) : (
    <div className="table">
      {slotInfo.map(({ slot, workers }, index) => (
        <Slot key={slot.id} slot={slot} workers={workers} />
      ))}
    </div>
  );

  return (
    <>
      <h1 className="page-title">{t('header')}</h1>
      {content}
    </>
  );
};

export default Slots;
