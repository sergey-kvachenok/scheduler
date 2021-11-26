import { getWorkerInfo, getCombinedData } from '.';
import { slot, workers, availableWorkers } from '../../utils/testUtils/constants';

describe('getWorkerInfo', () => {
  const workerNames = ['Maxwell Smith', 'Ellouise Riddle', 'Usaamah Mccall'];

  it('should return the list of workers matched by ids', () => {
    const workersIds = availableWorkers[0].availableWorker_ids;
    const result = getWorkerInfo(workersIds, workers);

    expect(result.length).toBe(workersIds.length);

    for (const worker of result) {
      expect(workerNames.includes(worker.name)).toBeTruthy();
    }
  });

  it('should return an empty array if has no matched workers', () => {
    const workersIds = [15, 16, 17];
    const result = getWorkerInfo(workersIds, workers);

    expect(result).toHaveLength(0);
  });

  it('should return an empty array if provided data is not correct', () => {
    const result = getWorkerInfo(workers);

    expect(result).toHaveLength(0);
  });
});

describe('getCombinedData', () => {
  const workerNames = ['Maxwell Smith', 'Ellouise Riddle', 'Usaamah Mccall'];

  it("should return combined data about slot and slot's workers", () => {
    const slots = [slot];
    const workersIds = availableWorkers[0].availableWorker_ids;
    const result = getCombinedData(availableWorkers, slots, workers);

    const firstItem = result[0];

    expect(firstItem.workers?.length).toBe(workersIds.length);
    expect(firstItem.slot?.localisedTime).toBe(slot.localisedTime);
  });

  it('should return an empty array if the data is not provided', () => {
    const result = getCombinedData();
    expect(result).toHaveLength(0);
  });
});
