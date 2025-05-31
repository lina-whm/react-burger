import { defineConfig } from 'cypress'

export default defineConfig({
	e2e: {
		baseUrl: 'http://localhost:3000',
		setupNodeEvents(on, config) {
			// Добавляем обработку ошибок
			on('before:run', () => {
				if (!process.env.CI) {
					require('cypress-plugin-retries/lib/plugin')(on)
				}
			})

			// Добавляем проверку доступности сервера
			on('task', {
				checkServer() {
					return new Promise(resolve => {
						require('is-port-reachable')('localhost', 3000).then(reachable =>
							resolve(reachable)
						)
					})
				},
			})

			return config
		},
		viewportWidth: 1280,
		viewportHeight: 720,
		defaultCommandTimeout: 30000,
		responseTimeout: 30000,
		video: false,
		retries: {
			runMode: 1,
			openMode: 0,
		},
		// Современный аналог experimentalSessionAndOrigin
		experimentalOriginDependencies: true,
	},
	env: {
		apiUrl: 'http://localhost:3000/api',
		local: true,
	},
})
