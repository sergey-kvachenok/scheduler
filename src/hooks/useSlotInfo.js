// libraries
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
// helpers
import { getCombinedData } from '../helpers/receiveData';
// utils
import { setTableInfo } from '../store/tableSlice';
import axios from '../utils/axios';

const requests = [axios.get('/slots.json'), axios.get('/workers.json'), axios.get('/available-workers.json')];

const useSlotInfo = () => {
  const dispatch = useDispatch();
  const [slotInfo, setSlotInfo] = useState(null);
  const [isFetching, setFetching] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const [{ data: slotsData }, { data: workersData }, { data: availableData }] = await Promise.all(requests);

        const available = availableData['available-workers'] || {};
        const { workers } = workersData || {};
        const { slots } = slotsData || {};

        const combined = getCombinedData(available, slots, workers);

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
