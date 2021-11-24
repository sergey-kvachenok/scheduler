describe('Scheduler', () => {
  const tableHeader = 'Available Slots';
  const workersListHeader = 'Available workers for chosen slot';
  const basketHeader = 'Slots to purchasing';
  const emptyBacketText = 'You basket is still empty';

  const deleteWorkerConfirmation = 'Would you like to delete the current worker';
  const deleteSlotConfirmation = 'Would you like to delete the current slot';

  const workersToAdd = ['Maxwell Smith', 'Sabrina Leal', 'Ifan Hewitt', 'Keir Campbell'];

  const popupOverlay = '.popup-overlay';
  const basket = '.basket-icon';

  it('allow to add workers to the basket and remove them from there', () => {
    cy.visit('/');
    cy.findByText(tableHeader).should('exist');

    const slotTable = cy.get('.table');
    slotTable.should('have.length', 1);

    const slot = cy.contains('Time: 13:00');
    slot.click({ force: true });

    cy.findByText(workersListHeader).should('exist');

    // add workers to the basket
    workersToAdd.forEach(name => {
      const panel = cy.get('[data-testid=worker]').filter(`:contains("${name}")`);
      const addButton = panel.find('.add-worker');
      addButton.should('have.class', 'primary');
      addButton.click({ force: true });

      addButton.should('have.class', 'disabled');
    });

    const overlay = cy.get(popupOverlay);
    overlay.click({ force: true });

    // go to the basket
    const basketIcon = cy.get(basket);
    basketIcon.click();
    cy.findByText(basketHeader).should('exist');

    // delete worker
    let deleteWorkerIcons = cy.get('[data-testid=remove-worker]');
    deleteWorkerIcons.should('have.length', 4);
    deleteWorkerIcons.first().click();
    cy.findByText(deleteWorkerConfirmation).should('exist');

    const confirmWorkerDeletionButton = cy.get('[data-testid=submit-button]');
    confirmWorkerDeletionButton.click();
    overlay.should('not.exist');

    deleteWorkerIcons = cy.get('[data-testid=remove-worker]');
    deleteWorkerIcons.should('have.length', 3);

    // delete slot
    let deleteSlotButton = cy.get('[data-testid=remove-slot]');
    deleteSlotButton.click();
    cy.findByText(deleteSlotConfirmation).should('exist');

    // cancel deletion
    const cancelDeletionButton = cy.get('[data-testid=cancel-button]');
    cancelDeletionButton.click();
    overlay.should('not.exist');

    // confirm deletion
    deleteSlotButton = cy.get('[data-testid=remove-slot]');
    deleteSlotButton.click();
    const confirmSlotDeletionButton = cy.get('[data-testid=submit-button]');
    confirmSlotDeletionButton.click();
    overlay.should('not.exist');

    cy.findByText(emptyBacketText).should('exist');

    // go to the home page
    const backButton = cy.get('[data-testid=back-button]');
    backButton.click();
    cy.findByText(tableHeader).should('exist');
  });
});
