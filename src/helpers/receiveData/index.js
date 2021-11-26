export const getWorkerInfo = (workerIds = [], workers = []) => {
  const workersCopy = [...workers];
  const workersIdsCopy = [...workerIds];

  return workersIdsCopy.map(id => workersCopy.find(({ id: workerId }) => workerId === id)).filter(worker => worker);
};

export const getCombinedData = (available = [], slotsInfo = [], workersInfo = []) => {
  const availableCopy = [...available];
  const slotsInfoCopy = [...slotsInfo];
  const workersInfoCopy = [...workersInfo];

  return availableCopy.map(({ slot_id, availableWorker_ids }) => {
    const currentSlot = slotsInfoCopy.find(({ id }) => id === slot_id);
    const currentWorkers = getWorkerInfo(availableWorker_ids, workersInfoCopy);

    return {
      slot: currentSlot,
      workers: currentWorkers,
    };
  });
};
