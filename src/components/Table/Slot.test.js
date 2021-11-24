import {Provider, useSelector, useDispatch } from 'react-redux';
import {render, fireEvent} from '@testing-library/react';
import Slot from './Slot';

import store from '../../store';

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

describe('Slot', () => {
    const state = {
      basket: {
    slots: [
      {id: 5,
      workers: [6]}
    ]
      }
  };

  const mockedDispatch = jest.fn();

   beforeEach(() => {
    useDispatch.mockReturnValue(mockedDispatch);
    useSelector.mockImplementation((callback) => {
      return callback(state);
    });
  });

  afterEach(() => {
    useDispatch.mockClear();
    useSelector.mockClear();
  });

    const slot = {
        "id": 1,
        "localisedTime": "12:00",
        "price": "£81.00"
    }

    const workers = [
        {
            "id": 1,
            "name": "Maxwell Smith",
            "rating": "4.1",
            "isNew": false
        },
        {
            "id": 2,
            "name": "Ellouise Riddle",
            "rating": "4.6",
            "isNew": true
        },
        {
            "id": 7,
            "name": "Usaamah Mccall",
            "rating": "5",
            "isNew": false
        }
    ]

  it('should render slot information', () => {
    const {getByText} = render(
          <Slot slot={slot} workers={workers} />
    );

    const text = ['Time:', "12:00", "Price:", "£81.00"]

    text.forEach(item => {
      expect(getByText(item)).toBeVisible();
    })
  });

  it('should render workers popup', async() => {
    const {findAllByTestId, getByTestId} = render(<Provider store={store}>
          <Slot slot={slot} workers={workers} />
          </Provider>
    );

    const popupButton = getByTestId('slot');

     fireEvent.click(popupButton);
     const popupWorkers = await findAllByTestId('worker')
     expect(popupWorkers.length).toBe(3)
     const firstWorker = workers[0];

     const firstWorkerNodeText = popupWorkers[0]?.textContent

     expect(firstWorkerNodeText.includes(firstWorker.name)).toBeTruthy()
     expect(firstWorkerNodeText.includes(firstWorker.rating)).toBeTruthy()
  });

 it('should render the Add button and dispatch the worker', async() => {
    const {findAllByTestId, getByTestId} = render(<Provider store={store}>
          <Slot slot={slot} workers={workers} />
          </Provider>
    );

    const dispatchData = {
      payload: {
        slotId: 1,
        workerId: 1},
        type: "basket/addWorker"
        }

    const popupButton = getByTestId('slot');

     fireEvent.click(popupButton);
     const addButtons = await findAllByTestId('add-worker')
     const addFirstWorkerButton = addButtons[0]
     fireEvent.click(addFirstWorkerButton);
    expect(mockedDispatch).toHaveBeenCalledWith(dispatchData);
  });
});
