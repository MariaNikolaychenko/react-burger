describe('Burger constructor works correctly', () => {
	Cypress.Commands.add('dragNDrop', (dragElement, isForce) => {
		cy.get(dragElement).trigger('dragstart');

		if (isForce) {
			cy.get('@drop').trigger('drop', {force: true});
		} else {
			cy.get('@drop').trigger('drop');
		}
	})

  	beforeEach(() => {
		cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" });
		cy.visit('/');

		cy.get('[data-testid^="bun-card_"]').first().as('bun');
		cy.get('[data-testid="drop-area"]').as('drop');
  	});

	it('should open Ingredient Details Modal and Close it by clicking on Close button', () => {
		cy.get('@bun').click();
		cy.get('[data-testid="modal-header"]').contains('Детали ингредиента');
		cy.get('[data-testid="ingredient-details"]').should('not.be.empty');
		cy.get('[data-testid="modal-close_button"]').click();
		cy.get('#modal-root').should('be.empty');
	});

	it('should open Ingredient Details Modal and Close it by clicking on overlay', () => {
		cy.get('@bun').click();
		cy.get('[data-testid="modal-header"]').contains('Детали ингредиента');
		cy.get('[data-testid="ingredient-details"]').should('not.be.empty');
		cy.get('[data-testid="modal-overlay"]').click({force: true});
		cy.get('#modal-root').should('be.empty');
	});

	it('should drag and drop bun to Burger Constructor', () => {
		cy.dragNDrop('@bun', false);
		
		cy.get('[data-testid="empty-top-bun"]').should('not.exist');
		cy.get('[data-testid="empty-bottom-bun"]').should('not.exist');
	});

	it('should drag and drop 2 ingredients to Burger Constructor', () => {
		cy.dragNDrop('[data-testid^="sauce-card_"]', true);
		cy.dragNDrop('[data-testid^="filling-card_"]', true);

		cy.get('[data-testid="empty-ingredients"]').should('not.exist');
	});
})