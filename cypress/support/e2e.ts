/// <reference types="cypress" />

// Добавляем проверку доступности сервера перед тестами
before(() => {
	// Проверяем доступность сервера
	cy.request({
		url: 'http://localhost:3000',
		failOnStatusCode: false,
		timeout: 30000,
	}).then(response => {
		if (response.status !== 200) {
			throw new Error(
				`Сервер localhost:3000 не доступен. Запустите приложение командой 'npm start'`
			)
		}
	})
})

// Добавляем обработку ошибок для всех тестов
Cypress.on('uncaught:exception', err => {
	console.error('Uncaught exception:', err)
	return false
})
