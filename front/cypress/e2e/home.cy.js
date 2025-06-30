describe('Page /todos - To-Do App', () => {
  it('doit afficher les éléments principaux de la page', () => {
    cy.visit('/todos');
    cy.contains('My To-Do List', { timeout: 60000 }); // attend que le h1 soit visible

    cy.contains('Remaining tasks');
    cy.contains('Completed tasks');
    cy.contains('No tasks available');
  });
});
