/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

declare namespace Cypress {
	interface Chainable {
		/**
		 * Custom command to select DOM element by data-testid attribute
		 * @example cy.getByTestId('ingredient-item')
		 */
		getByTestId(value: string): Chainable<JQuery<HTMLElement>>
	}
}
