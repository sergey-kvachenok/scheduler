// libraries
import { useSelector, useDispatch } from 'react-redux';
import { fireEvent } from '@testing-library/react';
// components
import Slot from '.';
// constants
import common from '../../../translations/en/common.json';
import { slot, workers } from '../../../utils/testUtils/constants';
// utils
import renderWithProviders from '../../../utils/testUtils/renderWithProviders';

describe('Slot', () => {
  const currentWorkers = workers.slice(0, 3);
  const state = {
    basket: {
      slots: [{ id: 5, currentWorkers: [2] }],
    },
  };

  const mockedDispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockedDispatch);
    useSelector.mockImplementation(callback => {
      return callback(state);
    });
  });

  afterEach(() => {
    useDispatch.mockClear();
    useSelector.mockClear();
  });

  it('should render slot information', () => {
    const { getByText } = renderWithProviders(<Slot slot={slot} workers={currentWorkers} />);

    const text = [common.time, slot.localisedTime, common.price, slot.price];

    text.forEach(item => {
      expect(getByText(item)).toBeVisible();
    });
  });

  it('should render workers popup', async () => {
    const { findAllByTestId, getByTestId } = renderWithProviders(<Slot slot={slot} workers={currentWorkers} />);

    const popupButton = getByTestId('slot');
    fireEvent.click(popupButton);

    const popupWorkers = await findAllByTestId('worker');
    expect(popupWorkers.length).toBe(currentWorkers.length);

    const firstWorker = workers[0];
    const firstWorkerNodeText = popupWorkers[0]?.textContent;
    expect(firstWorkerNodeText.includes(firstWorker.name)).toBeTruthy();
    expect(firstWorkerNodeText.includes(firstWorker.rating)).toBeTruthy();
  });

  it('should render the Add button and dispatch the worker', async () => {
    const { findAllByTestId, getByTestId } = renderWithProviders(<Slot slot={slot} workers={currentWorkers} />);

    const dispatchData = {
      payload: {
        slotId: 1,
        workerId: 1,
      },
      type: 'basket/addWorker',
    };

    const popupButton = getByTestId('slot');
    fireEvent.click(popupButton);

    const addButtons = await findAllByTestId('add-worker');

    const addFirstWorkerButton = addButtons[0];
    fireEvent.click(addFirstWorkerButton);
    expect(mockedDispatch).toHaveBeenCalledWith(dispatchData);
  });
});
