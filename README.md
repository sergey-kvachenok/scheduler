# Install dependencies
  ### `yarn (or npm install)`

## Start the app
  ### `yarn start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

### `yarn cypress` - run integration tests

# Description
The app provides a table of time slots. Each time slot has its own price and a list of available workers. A user can book a necessary amount of slots and workers in every slot.
A user can see his orders in the basket. If a user had chosen more than one worker in the slot, the price will multiply by the number of workers.
A user can remove the slot (with all workers) from the basket or remove a worker from the slot. Each deletion operation opens a confirmation popup before deletion.