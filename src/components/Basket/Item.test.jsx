import { Provider, useSelector, useDispatch } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { render, fireEvent } from '@testing-library/react';
import Item from './Item';
import { theme } from '../../constants/theme';
import { slot, workers } from '../../testUtils/constants';

import store from '../../store';

describe('Basket Item', () => {
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
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Item slot={slot} workers={workers} />
      </ThemeProvider>,
    );

    const text = ['Time: 12:00', 'Price per person:', '£81.00', 'You have booked:', 'Total per slot:', '£243'];

    text.forEach(item => {
      expect(getByText(item)).toBeVisible();
    });
  });

  it('should render the Remove slot button and dispatch the event', async () => {
    const { findAllByTestId, findByTestId, getByText } = render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Item slot={slot} workers={workers} />
        </Provider>
      </ThemeProvider>,
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

    expect(getByText('Would you like to delete the current slot')).toBeVisible();

    const submitButton = await findByTestId('submit-button');
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);
    expect(mockedDispatch).toHaveBeenCalledWith(dispatchData);
  });

  it('should render the Remove worker button and dispatch the event', async () => {
    const { findAllByTestId, getByText, findByTestId } = render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Item slot={slot} workers={workers} />
        </Provider>
      </ThemeProvider>,
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

    expect(getByText('Would you like to delete the current worker')).toBeVisible();

    const submitButton = await findByTestId('submit-button');
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);
    expect(mockedDispatch).toHaveBeenCalledWith(dispatchData);
  });

  it('should render the Remove worker button and not dispatch the event when cancel clicked', async () => {
    const { findAllByTestId, getByText, findByTestId, queryByText } = render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Item slot={slot} workers={workers} />
        </Provider>
      </ThemeProvider>,
    );

    const removeWorkerButtons = await findAllByTestId('remove-worker');
    const removeFirstWorkerButton = removeWorkerButtons[0];
    fireEvent.click(removeFirstWorkerButton);

    const confirmationPopupText = 'Would you like to delete the current worker';

    expect(getByText(confirmationPopupText)).toBeVisible();

    const cancelButton = await findByTestId('cancel-button');
    expect(cancelButton).toBeInTheDocument();
    fireEvent.click(cancelButton);
    expect(mockedDispatch).not.toHaveBeenCalled();
    const popupText = queryByText(confirmationPopupText);
    expect(popupText).not.toBeInTheDocument();
  });
});
