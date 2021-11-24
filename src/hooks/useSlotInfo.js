import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { setTableInfo } from '../store/tableSlice';
import axios from '../api/axios';

const requests = [axios.get('/slots.json'), axios.get('/workers.json'), axios.get('/available-workers.json')];

const useSlotInfo = () => {
  const dispatch = useDispatch();
  const [slotInfo, setSlotInfo] = useState(null);
  const [isFetching, setFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setFetching(true);
        const [{ data: slotsData }, { data: workersData }, { data: availableData }] = await Promise.all(requests);

        const available = availableData['available-workers'] || {};
        const { workers } = workersData || {};
        const { slots } = slotsData || {};

        const getWorkerInfo = workerIds => {
          return workerIds.map(id => workers.find(({ id: workerId }) => workerId === id));
        };

        const combined = available.map(({ slot_id, availableWorker_ids }) => {
          const currentSlot = slots.find(({ id }) => id === slot_id);
          const currentWorkers = getWorkerInfo(availableWorker_ids);

          return {
            slot: currentSlot,
            workers: currentWorkers,
          };
        });

        setSlotInfo(combined);
        dispatch(setTableInfo(combined));
      } catch (error) {
        setError(error);
      } finally {
        setFetching(false);
      }
    };

    getData();
  }, [dispatch]);

  return [slotInfo, isFetching, error];
};

export default useSlotInfo;
