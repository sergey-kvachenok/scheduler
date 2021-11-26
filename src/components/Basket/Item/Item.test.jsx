// libraries
import { useSelector, useDispatch } from 'react-redux';
import { fireEvent } from '@testing-library/react';
// components
import Item from '.';
// constants
import basket from '../../../translations/en/basket.json';
import common from '../../../translations/en/common.json';
import { slot, workers } from '../../../utils/testUtils/constants';
// utils
import renderWithProviders from '../../../utils/testUtils/renderWithProviders';

describe('Basket Item', () => {
  const deleteSlotConfirmation = 'Would you like to delete 12:00 slot with all workers from the basket?';
  const deleteWorkerConfirmation = 'Would you like to delete Maxwell Smith from the slot?';

  const currentWorkers = workers.slice(0, 3);
  const state = {
    basket: {
      slots: [{ id: 5, workers: [6] }],
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
    const { getByText } = renderWithProviders(<Item slot={slot} workers={currentWorkers} />);

    const text = [
      `${common.time} ${slot.localisedTime}`,
      basket.pricePerPerson,
      slot.price,
      basket.booked,
      basket.totalPerSlot,
      '£243',
    ];

    text.forEach(item => {
      expect(getByText(item)).toBeVisible();
    });
  });

  it('should render the Remove slot button and dispatch the event', async () => {
    const { findAllByTestId, findByTestId, getByText } = renderWithProviders(
      <Item slot={slot} workers={currentWorkers} />,
    );

    const dispatchData = {
      payload: {
        slotId: 1,
      },
      type: 'basket/removeSlot',
    };

    const removeSlotButtons = await findAllByTestId('remove-slot');
    const removeFirstSlotButton = removeSlotButtons[0];
    fireEvent.click(removeFirstSlotButton);

    expect(getByText(deleteSlotConfirmation)).toBeVisible();

    const submitButton = await findByTestId('submit-button');
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);

    expect(mockedDispatch).toHaveBeenCalledWith(dispatchData);
  });

  it('should render the Remove worker button and dispatch the event', async () => {
    const { findAllByTestId, getByText, findByTestId } = renderWithProviders(
      <Item slot={slot} workers={currentWorkers} />,
    );

    const dispatchData = {
      payload: {
        slotId: 1,
        workerId: 1,
      },
      type: 'basket/removeWorker',
    };

    const removeWorkerButtons = await findAllByTestId('remove-worker');
    const removeFirstWorkerButton = removeWorkerButtons[0];
    fireEvent.click(removeFirstWorkerButton);

    expect(getByText(deleteWorkerConfirmation)).toBeVisible();

    const submitButton = await findByTestId('submit-button');
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);

    expect(mockedDispatch).toHaveBeenCalledWith(dispatchData);
  });

  it('should render the Remove worker button and not dispatch the event when cancel clicked', async () => {
    const { findAllByTestId, getByText, findByTestId, queryByText } = renderWithProviders(
      <Item slot={slot} workers={currentWorkers} />,
    );

    const removeWorkerButtons = await findAllByTestId('remove-worker');
    const removeFirstWorkerButton = removeWorkerButtons[0];
    fireEvent.click(removeFirstWorkerButton);

    expect(getByText(deleteWorkerConfirmation)).toBeVisible();

    const cancelButton = await findByTestId('cancel-button');
    expect(cancelButton).toBeInTheDocument();
    fireEvent.click(cancelButton);

    expect(mockedDispatch).not.toHaveBeenCalled();

    const popupText = queryByText(deleteWorkerConfirmation);
    expect(popupText).not.toBeInTheDocument();
  });
});
