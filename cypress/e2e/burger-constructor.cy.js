describe('Burger constructor works correctly', () => {
  	beforeEach(() => {
		cy.visit('http://localhost:3000');
  	})

	it('should open Ingredient Details Modal and Close it by clicking on overlay', () => {
		cy.get('[data-testid="bun-card_0"]').click();
		cy.get('[data-testid="modal-header"]').contains('Детали ингредиента');
		cy.get('[data-testid="ingredient-details"]').should('not.be.empty');
		cy.get('[data-testid="modal-overlay"]').click({force: true});
		cy.get('#modal-root').should('be.empty');
	})

	it('should login, Dnd ingredients, Create Order and click Close button on Modal', () => {
		cy.visit('http://localhost:3000/login');
		const email = 'hedim28394@biscoine.com';
		const password = 'hedim28394@biscoine.com';

		cy.get('[data-testid="email"]').type(email);
		cy.get('[data-testid="password"]').type(password);
		cy.get('[data-testid="submit"]').click();
		cy.get('[data-testid="submit"]', { timeout: 10000 }).should('not.exist');


		cy.get('[data-testid="bun-card_0"]').trigger('dragstart');
		cy.get('[data-testid="drop-area"]').trigger('drop', { force: true });

		cy.get('[data-testid="ingredient-card_0"]').trigger('dragstart');
		cy.get('[data-testid="drop-area"]').trigger('drop', { force: true });

		cy.get('[data-testid="ingredient-card_2"]').trigger('dragstart');
		cy.get('[data-testid="drop-area"]').trigger('drop', { force: true });
		

		cy.get('[data-testid="place-order"]').click();
		cy.get('#modal-root', {timeout: 20000}).should('not.be.empty');
		cy.get('[data-testid="order-details"]').should('not.be.empty');
		cy.get('[data-testid="modal-close_button"]').click();
		cy.get('#modal-root').should('be.empty');
	})
})