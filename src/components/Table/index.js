import useSlotInfo from '../../hooks/useSlotInfo'
import Slot from './Slot';

const Table = () => {
  const [slotInfo, isFetching, error] = useSlotInfo();

  if (!slotInfo) {
    return <div>Loading...</div>
  }

  return (
  <div className="table">
  {slotInfo.map(({slot, workers}) => <Slot key={slot.id} slot={slot} workers={workers}/>)}
  </div>
  )
}

export default Table