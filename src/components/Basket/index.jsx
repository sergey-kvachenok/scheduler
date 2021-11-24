import { useDispatch, useSelector } from "react-redux";

const Basket = () => {
   const dispatch = useDispatch()
  const { data = [] } = useSelector(({tableInfo}) => tableInfo || {});
  const { slots = [] } = useSelector(({basket}) => basket || {});

  const slotInfo = slots.map(({id, workers}) => {
    const appropriateSlotInfo = data?.find(({slot}) => slot.id === id);
    
    const {workers: appropriateSlotBookedWorkers} = appropriateSlotInfo || {}

    const filteredWorkers = appropriateSlotBookedWorkers.reduce((acc, worker) => {
      return workers.includes(worker.id) ? [...acc, worker] : [...acc]
    }, [])

    return {
      slot: {...appropriateSlotInfo.slot},
      workers: filteredWorkers
    }
  })
  console.log('slotInfo', slotInfo)
// const {id, workers}


  return null
  // (
  //   <div>{
  //     slots?.map(({id, workers}) )
  //   }</div>
  // )
}

export default Basket;
