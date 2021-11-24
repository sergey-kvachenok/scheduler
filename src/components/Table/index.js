import useSlotInfo from '../../hooks/useSlotInfo';
import Slot from './Slot';

const Table = () => {
  const [slotInfo, isFetching, error] = useSlotInfo();

  if (!slotInfo) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2>Available Slots</h2>
      <div className="table">
        {slotInfo.map(({ slot, workers }, index) => (
          <Slot tabIndex={index + 1} key={slot.id} slot={slot} workers={workers} />
        ))}
      </div>
    </>
  );
};

export default Table;
