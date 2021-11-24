import { useDispatch} from "react-redux";
import { useState, useEffect } from 'react';
import { setTableInfo } from "../store/tableSlice";
import axios from '../api/axios';

const useSlotInfo = () => {
  const dispatch = useDispatch()
  const [slotInfo, setSlotInfo] = useState(null);
  const [isFetching, setFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setFetching(true)
      const {data: slotsData} = await axios.get('/slots.json');
      const {data: workersData} = await axios.get('/workers.json');
      const {data: availableData} = await axios.get('/available-workers.json');

      const available= availableData['available-workers'] || {};
      const {workers} = workersData || {}
      const {slots} = slotsData || {}

      const getWorkerInfo = (workerIds) => {
        return workerIds.map(id => workers.find(({id: workerId}) => workerId === id)
        )
      }

      const combined = available.map(({slot_id, availableWorker_ids}) => {
        const currentSlot = slots.find(({id}) => id === slot_id);
        const currentWorkers =  getWorkerInfo(availableWorker_ids);

        return ({
          slot: currentSlot,
          workers: currentWorkers
        })
      })

      setSlotInfo(combined);
      dispatch(setTableInfo(combined))
      } catch (error) {
        setError(error)
      } finally {
        setFetching(false)
      }
    }

   getData()
}, [])

return [slotInfo, isFetching, error]
}

export default useSlotInfo;
