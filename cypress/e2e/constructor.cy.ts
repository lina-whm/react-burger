/// <reference types="cypress" />

const SELECTORS = {
	INGREDIENT_BUN: '[data-testid="ingredient-bun"]',
	INGREDIENT_MAIN: '[data-testid="ingredient-main"]',
	CONSTRUCTOR_DROP_AREA: '[data-testid="constructor-drop-area"]',
	CONSTRUCTOR_BUN_TOP: '[data-testid="constructor-bun-top"]',
	CONSTRUCTOR_BUN_BOTTOM: '[data-testid="constructor-bun-bottom"]',
	CONSTRUCTOR_INGREDIENT: '[data-testid="constructor-ingredient"]',
	ORDER_BUTTON: '[data-testid="order-button"]',
	MODAL: '[data-testid="modal"]',
	MODAL_CLOSE: '[data-testid="modal-close"]',
	INGREDIENT_DETAILS: '[data-testid="ingredient-details"]',
	INGREDIENT_DETAILS_NAME: '[data-testid="ingredient-details-name"]',
	ORDER_DETAILS: '[data-testid="order-details"]',
	ORDER_NUMBER: '[data-testid="order-number"]',
}

describe('Burger Constructor', () => {
	beforeEach(() => {
		cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
			'getIngredients'
		)
		cy.visit('/')
		cy.wait('@getIngredients')
	})

	it('Должен загружать ингредиенты', () => {
		cy.get(SELECTORS.INGREDIENT_BUN).should('exist')
		cy.get(SELECTORS.INGREDIENT_MAIN).should('exist')
	})

	it('Должен перетаскивать ингредиенты в конструктор', () => {
		cy.get(SELECTORS.INGREDIENT_BUN).first().as('draggableBun')
		cy.get(SELECTORS.CONSTRUCTOR_DROP_AREA).as('dropTarget')

		cy.get('@draggableBun').trigger('dragstart')
		cy.get('@dropTarget').trigger('drop')

		cy.get(SELECTORS.CONSTRUCTOR_BUN_TOP).should('exist')
		cy.get(SELECTORS.CONSTRUCTOR_BUN_BOTTOM).should('exist')

		cy.get(SELECTORS.INGREDIENT_MAIN).first().as('draggableMain')
		cy.get('@draggableMain').trigger('dragstart')
		cy.get('@dropTarget').trigger('drop')

		cy.get(SELECTORS.CONSTRUCTOR_INGREDIENT).should('have.length', 1)
	})

	it('Должен открывать и закрывать модальное окно ингредиента', () => {
		cy.get(SELECTORS.INGREDIENT_BUN).first().click()
		cy.get(SELECTORS.INGREDIENT_DETAILS).should('be.visible')
		cy.get(SELECTORS.INGREDIENT_DETAILS_NAME).should(
			'contain',
			'Краторная булка N-200i'
		)
		cy.get(SELECTORS.MODAL_CLOSE).click()
		cy.get(SELECTORS.INGREDIENT_DETAILS).should('not.exist')
	})

	describe('Создание заказа', () => {
		beforeEach(() => {
			cy.get(SELECTORS.INGREDIENT_BUN).first().trigger('dragstart')
			cy.get(SELECTORS.CONSTRUCTOR_DROP_AREA).trigger('drop')
			cy.get(SELECTORS.INGREDIENT_MAIN).first().trigger('dragstart')
			cy.get(SELECTORS.CONSTRUCTOR_DROP_AREA).trigger('drop')

			cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as(
				'createOrder'
			)
		})

		it('Должен перенаправлять на страницу логина при неавторизованном пользователе', () => {
			cy.get(SELECTORS.ORDER_BUTTON).click()
			cy.location('pathname').should('eq', '/login')
		})

		it('Должен создавать заказ для авторизованного пользователя', () => {
			cy.setCookie('accessToken', 'test-token')
			window.localStorage.setItem('refreshToken', 'test-refresh-token')

			cy.get(SELECTORS.ORDER_BUTTON).click()
			cy.wait('@createOrder')
			cy.get(SELECTORS.ORDER_DETAILS).should('be.visible')
			cy.get(SELECTORS.ORDER_NUMBER).should('contain', '12345')
		})
	})
})
