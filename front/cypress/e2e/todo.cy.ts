describe('To-Do E2E', () => {
  beforeEach(() => {
    cy.visit('/todos');
  });

  it('affiche la liste vide au départ', () => {
    cy.contains('No tasks available');
  });

  it('ajoute une tâche', () => {
    cy.get('input[placeholder="Add a new task..."]').type('Ma première tâche');
    cy.contains('Add Task').click();
    cy.get('.task-list').should('contain.text', 'Ma première tâche');
  });

//   it('marque une tâche comme complétée', () => {
//     cy.get('input[placeholder="Add a new task..."]').type('À compléter');
//     cy.contains('Add Task').click();
//     cy.get('.task-list li').last().find('.task-text').click();
//     cy.get('.task-list li').last().should('have.class', 'task-completed');
//   });

//   it('édite une tâche', () => {
//     cy.get('input[placeholder="Add a new task..."]').type('À éditer');
//     cy.contains('Add Task').click();
//     cy.get('.task-list li').last().find('.dropdown-toggle').click();
//     cy.contains('Edit').click();
//     cy.get('.task-list li input[type="text"]').clear().type('Tâche éditée');
//     cy.get('.task-list li .btn-primary').click();
//     cy.get('.task-list').should('contain.text', 'Tâche éditée');
//   });

//   it('supprime une tâche', () => {
//     cy.get('input[placeholder="Add a new task..."]').type('À supprimer');
//     cy.contains('Add Task').click();
//     cy.get('.task-list li').last().find('.dropdown-toggle').click();
//     cy.contains('Delete').click();
//     cy.get('.task-list').should('not.contain.text', 'À supprimer');
//   });
});