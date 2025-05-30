/// <reference types="cypress" />

describe('Burger Constructor', { retries: 1 }, () => {
	before(() => {
		cy.log('Проверяем доступность API ингредиентов')
		cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
			'getIngredients'
		)
	})

	beforeEach(() => {
		cy.log('Загружаем страницу конструктора')
		cy.visit('/', {
			retryOnNetworkFailure: true,
			timeout: 30000,
		})
		cy.wait('@getIngredients', { timeout: 30000 })
	})

	it('Должен загружать ингредиенты', () => {
		cy.get('[data-testid="ingredient-item"]').should('have.length.at.least', 1)
	})

	it('Должен перетаскивать ингредиенты в конструктор', function () {
		cy.get('[data-testid="ingredient-bun"]').first().as('draggableBun')
		cy.get('[data-testid="constructor-drop-area"]').as('dropTarget')

		cy.get('@draggableBun').trigger('dragstart')
		cy.get('@dropTarget').trigger('drop')

		cy.get('[data-testid="constructor-bun-top"]').should('exist')
		cy.get('[data-testid="constructor-bun-bottom"]').should('exist')

		cy.get('[data-testid="ingredient-main"]').first().as('draggableMain')
		cy.get('@draggableMain').trigger('dragstart')
		cy.get('@dropTarget').trigger('drop')

		cy.get('[data-testid="constructor-ingredient"]').should('have.length', 1)
	})

	it('Должен открывать и закрывать модальное окно ингредиента', () => {
		cy.get('[data-testid="ingredient-item"]').first().click()
		cy.get('[data-testid="ingredient-details"]').should('be.visible')
		cy.get('[data-testid="modal-close"]').click()
		cy.get('[data-testid="ingredient-details"]').should('not.exist')
	})

	describe('Создание заказа', () => {
		beforeEach(() => {
			cy.get('[data-testid="ingredient-bun"]').first().trigger('dragstart')
			cy.get('[data-testid="constructor-drop-area"]').trigger('drop')
			cy.get('[data-testid="ingredient-main"]').first().trigger('dragstart')
			cy.get('[data-testid="constructor-drop-area"]').trigger('drop')

			cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as(
				'createOrder'
			)
		})

		it('Должен перенаправлять на страницу логина при неавторизованном пользователе', () => {
			cy.get('[data-testid="order-button"]').click()
			cy.location('pathname').should('eq', '/login')
		})

		it('Должен создавать заказ для авторизованного пользователя', () => {
			cy.window().then(win => {
				win.localStorage.setItem('accessToken', 'test-token')
				win.localStorage.setItem('refreshToken', 'test-refresh-token')
			})

			cy.get('[data-testid="order-button"]').click()
			cy.wait('@createOrder', { timeout: 30000 })
			cy.get('[data-testid="order-details"]').should('be.visible')
			cy.get('[data-testid="order-number"]').should('contain', '12345')
		})
	})
})
