describe("Page d'accueil - To-Do App", () => {
  it("doit afficher les éléments principaux de la page de tâches", () => {
    cy.visit('/');

    // Vérifie le logo/titre principal
    cy.contains("To-Do App").should('exist');

    // Vérifie le titre de la section
    cy.contains("My to-do list").should('exist');

    // Vérifie les compteurs
    cy.contains("Remaining tasks").should('exist');
    cy.contains("Completed tasks").should('exist');

    // Vérifie le message d'accueil si aucune tâche
    cy.contains("No tasks available").should('exist');
    cy.contains("Add your first task to get started!").should('exist');
  });
});
