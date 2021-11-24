import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import Item from "./Item";

const Container = styled.div`
  margin: 0 auto;
  max-width: 500px;
  width: 100%;
`

const Basket = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate();
  const { data = [] } = useSelector(({tableInfo}) => tableInfo || {});
  const { slots = [] } = useSelector(({basket}) => basket || {});

  const moveBack = () => {
    navigate('/')
  }

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

  const content = slotInfo?.length
   ? slotInfo?.map(({slot, workers}) => <Item key={slot?.id} slot={slot} workers={workers} />)
  : <p>You basket is still empty</p>


  return (<Container>
    <button onClick={moveBack} className="default-button secondary">Back</button>
    {content}
    </Container>
    )
}

export default Basket;
