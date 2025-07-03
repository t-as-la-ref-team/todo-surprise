// front/cypress/e2e/member.cy.test.ts

describe('Membres E2E', () => {
  const baseUrl = 'member';

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('ajoute un membre', () => {
    cy.get('[data-cy=add-member-btn]').click();
    cy.get('[data-cy=member-form]').within(() => {
      cy.get('input[name=lastname]').type('Dupont', { force: true });
      cy.wait(100);
      cy.get('input[name=firstname]').type('Jean', { force: true });
      cy.wait(100);
      cy.get('input[name=email]').type('jean.dupont@test.com', { force: true });
    });
    cy.get('.modal-footer .btn-primary').contains('Add').should('be.visible').click();
    cy.get('[data-cy=member-list]', { timeout: 10000 }).should('contain.text', 'Jean');
    cy.get('[data-cy=member-list]').should('contain.text', 'Dupont');
  });

  it('affiche la liste des membres', () => {
    cy.get('[data-cy=member-list]', { timeout: 10000 }).should('exist');
    cy.get('[data-cy=member-list] li').its('length').should('be.gte', 0);
  });

  it('modifie un membre', () => {
    cy.get('[data-cy=member-list] li').first().within(() => {
      cy.get('[data-cy=edit-member-btn]').click();
    });
    cy.get('[data-cy=member-form]').within(() => {
      cy.get('input[name=firstname]').clear().type('Marie', { force: true });
      cy.root().submit();
    });
    cy.wait(500);
    cy.get('[data-cy=member-list]', { timeout: 10000 }).contains('Marie');
  });

  it('supprime un membre', () => {
    cy.get('[data-cy=member-list] li').then($items => {
      const initialCount = $items.length;
      cy.get('[data-cy=member-list] li').first().within(() => {
        cy.get('[data-cy=delete-member-btn]').click();
      });
      cy.get('[data-cy=member-list] li', { timeout: 10000 }).should('have.length', initialCount - 1);
    });
  });
});