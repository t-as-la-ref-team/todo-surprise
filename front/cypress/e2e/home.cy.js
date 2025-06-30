describe('Page /todos - To-Do App', () => {
  it('doit afficher les éléments principaux de la page', () => {
    cy.visit('/todos');
    cy.contains('MY TO-DO LIST');
    cy.contains('Remaining tasks');
    cy.contains('Completed tasks');
    cy.contains('No tasks available');
  });
});

