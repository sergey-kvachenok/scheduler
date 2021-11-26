// helpers
import { getCombinedData } from '../../src/helpers/receiveData/index';
// utils
import axios from '../../src/utils/axios';
// constants
import slots from '../../src/translations/en/slots.json';
import basket from '../../src/translations/en/basket.json';
import common from '../../src/translations/en/common.json';

const tableHeader = 'Available Slots';
const workersListHeader = 'Available workers for chosen slot';
const deleteWorkerConfirmation = workerName => `Would you like to delete ${workerName} from the slot?`;
const deleteSlotConfirmation = time => `Would you like to delete ${time} slot with all workers from the basket?`;

const popupOverlay = '.popup-overlay';
const basketIconSelector = '.basket-icon';

let combined;
let workersToAdd;
let testSlot;

describe('Scheduler', () => {
  before(async () => {
    const requests = [axios('/slots.json'), axios('/workers.json'), axios('/available-workers.json')];

    const [{ data: slotsData }, { data: workersData }, { data: availableData }] = await Promise.all(requests);

    const available = availableData['available-workers'] || {};
    const { workers } = workersData || {};
    const { slots } = slotsData || {};

    combined = getCombinedData(available, slots, workers);
    testSlot = combined[2];
    workersToAdd = testSlot.workers.slice(0, 4).map(({ name }) => name);
    console.log('combined', combined);
  });

  it('allow to add workers to the basket', () => {
    openWorkersList();
    addWorkersToBasket(workersToAdd);

    const overlay = cy.get(popupOverlay);
    overlay.click({ force: true });

    goToBasket();

    workersToAdd.forEach(worker => {
      cy.findByText(worker).should('exist');
    });
  });

  it('allow to remove worker from the basket when the slot modal is open', () => {
    const workersToRemoveFromBasket = ['Maxwell Smith', 'Sabrina Leal'];
    openWorkersList();
    addWorkersToBasket(workersToAdd);

    workersToRemoveFromBasket.forEach(worker => {
      const panel = cy.get('[data-testid=worker]').filter(`:contains("${worker}")`);
      const removeButton = panel.find('[data-testid=add-worker]');

      removeButton.click({ force: true });
    });
    const addedWorkersCount = workersToAdd.length - workersToRemoveFromBasket.length;
    cy.findAllByText(common.remove).should('have.length', addedWorkersCount);

    const overlay = cy.get(popupOverlay);
    overlay.click({ force: true });

    goToBasket();

    workersToRemoveFromBasket.forEach(worker => {
      cy.findByText(worker).should('not.exist');
    });
  });

  it('allow to go to the basket from workers modal', async () => {
    openWorkersList();
    addWorkersToBasket(workersToAdd);

    const basketLink = cy.findByText(slots.workers.basketLink).should('exist');
    basketLink.click({ force: true });
    cy.findByText(basket.header).should('exist');
  });

  it('should not show the basket link, if no items in the basket', async () => {
    openWorkersList();

    cy.findByText(slots.workers.basketLink).should('not.exist');
  });

  it('allow to delete workers from the slot in the basket', () => {
    openWorkersList();
    addWorkersToBasket(workersToAdd);

    const overlay = cy.get(popupOverlay);
    overlay.click({ force: true });

    goToBasket();

    let deleteWorkerIcons = cy.get('[data-testid=remove-worker]');
    deleteWorkerIcons.should('have.length', workersToAdd.length);

    const workerName = workersToAdd[0];
    deleteWorkerIcons.first().click();
    cy.findByText(deleteWorkerConfirmation(workerName)).should('exist');
    const confirmWorkerDeletionButton = cy.get('[data-testid=submit-button]');
    confirmWorkerDeletionButton.click();
    overlay.should('not.exist');

    deleteWorkerIcons = cy.get('[data-testid=remove-worker]');
    deleteWorkerIcons.should('have.length', workersToAdd.length - 1);
  });

  it("allow to cancel slot's deletion", () => {
    openWorkersList();
    addWorkersToBasket(workersToAdd);

    const overlay = cy.get(popupOverlay);
    overlay.click({ force: true });

    goToBasket();

    let deleteSlotButton = cy.get('[data-testid=remove-slot]');
    deleteSlotButton.click();
    cy.findByText(deleteSlotConfirmation('13:00')).should('exist');

    const cancelDeletionButton = cy.get('[data-testid=cancel-button]');
    cancelDeletionButton.click();
    overlay.should('not.exist');
  });

  it('allow to delete slot with all workers', () => {
    openWorkersList();
    addWorkersToBasket(workersToAdd);

    const overlay = cy.get(popupOverlay);
    overlay.click({ force: true });

    goToBasket();

    const deleteSlotButton = cy.get('[data-testid=remove-slot]');
    deleteSlotButton.click();
    const confirmSlotDeletionButton = cy.get('[data-testid=submit-button]');
    confirmSlotDeletionButton.click();
    overlay.should('not.exist');

    cy.findByText(basket.emptyBasket).should('exist');
  });

  it("allow to go to the slots' page", () => {
    goToBasket();

    const backButton = cy.get('[data-testid=back-button]');
    backButton.click();
    cy.findByText(tableHeader).should('exist');
  });
});

// helpers
const openWorkersList = () => {
  cy.visit('/');
  cy.findByText(tableHeader).should('exist');

  const slotTable = cy.get('.table');
  slotTable.should('have.length', 1);

  const slot = cy.contains(`Time: ${testSlot.slot.localisedTime}`);
  slot.click({ force: true });

  cy.findByText(workersListHeader).should('exist');
};

const addWorkersToBasket = (workers = []) => {
  const workersCopy = [...workers];

  workersCopy.forEach(name => {
    const panel = cy.get('[data-testid=worker]').filter(`:contains("${name}")`);
    const addButton = panel.find('[data-testid=add-worker]');
    addButton.should('have.class', 'primary');
    addButton.click({ force: true });
  });

  cy.findAllByText(common.remove).should('have.length', workersToAdd.length);
};

const goToBasket = () => {
  const basketIcon = cy.get(basketIconSelector);
  basketIcon.click();
  cy.findByText(basket.header).should('exist');
};
