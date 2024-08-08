describe('Burger constructor works correctly', () => {
  	beforeEach(() => {
		cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" });
		cy.visit('http://localhost:3000');
  	});

	it('should open Ingredient Details Modal and Close it by clicking on Close button', () => {
		cy.get('[data-testid^="bun-card_"]').first().click();
		cy.get('[data-testid="modal-header"]').contains('Детали ингредиента');
		cy.get('[data-testid="ingredient-details"]').should('not.be.empty');
		cy.get('[data-testid="modal-close_button"]').click();
		cy.get('#modal-root').should('be.empty');
	});

	it('should open Ingredient Details Modal and Close it by clicking on overlay', () => {
		cy.get('[data-testid^="bun-card_"]').first().click();
		cy.get('[data-testid="modal-header"]').contains('Детали ингредиента');
		cy.get('[data-testid="ingredient-details"]').should('not.be.empty');
		cy.get('[data-testid="modal-overlay"]').click({force: true});
		cy.get('#modal-root').should('be.empty');
	});

	it('should drag and drop bun to Burger Constructor', () => {
		cy.get('[data-testid^="bun-card_"]').first().trigger('dragstart');
		cy.get('[data-testid="drop-area"]').trigger('drop');
		cy.get('[data-testid="empty-top-bun"]').should('not.exist');
		cy.get('[data-testid="empty-bottom-bun"]').should('not.exist');
	});

	it('should drag and drop 2 ingredients to Burger Constructor', () => {
		cy.get('[data-testid^="souce-card_"]').first().trigger('dragstart');
		cy.get('[data-testid="drop-area"]').trigger('drop');

		cy.get('[data-testid^="filling-card_"]').first().trigger('dragstart');
		cy.get('[data-testid="drop-area"]').trigger('drop');
		
		cy.get('[data-testid="empty-ingredients"]').should('not.exist');
	});
})