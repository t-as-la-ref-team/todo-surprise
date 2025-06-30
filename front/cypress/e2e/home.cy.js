describe('Page /todos - To-Do App', () => {
  it('doit afficher les éléments principaux de la page', () => {
    cy.visit('/todos');

    // attendre que le titre soit visible pour être sûr que la page est bien chargée
    cy.contains('MY TO-DO LIST', { timeout: 10000 }).should('be.visible');

    // Vérifie la présence des textes clés
    cy.contains('Remaining tasks').should('be.visible');
    cy.contains('Completed tasks').should('be.visible');
    cy.contains('No tasks available').should('be.visible');
  });
});
