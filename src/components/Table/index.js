import useSlotInfo from '../../hooks/useSlotInfo';
import Slot from './Slot';
import Error from '../common/Error';
import Spinner from '../common/Spinner';

const Table = () => {
  const [slotInfo, isFetching, error] = useSlotInfo();

  if (isFetching) {
    return <Spinner loadingText="Loading available slots..." />;
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
      <h2>Available Slots</h2>
      {content}
    </>
  );
};

export default Table;
