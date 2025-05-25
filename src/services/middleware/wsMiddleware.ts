import { Middleware } from '@reduxjs/toolkit'

export const wsMiddleware: Middleware = store => {
	let socket: WebSocket | null = null

	return next => action => {
		if (action.type === 'WS_CONNECT') {
			const correctUrl = action.payload.withToken
				? `wss://norma.nomoreparties.space/orders?token=${localStorage
						.getItem('accessToken')
						?.replace('Bearer ', '')}`
				: 'wss://norma.nomoreparties.space/orders/all'

			console.log('Connecting to WebSocket:', correctUrl)

			if (socket) socket.close()

			socket = new WebSocket(correctUrl)

			socket.onopen = () => {
				store.dispatch({ type: 'WS_CONNECTION_SUCCESS' })
			}

			socket.onerror = error => {
				console.error('WebSocket error:', error)
			}

			socket.onclose = () => {
				store.dispatch({ type: 'WS_CONNECTION_CLOSED' })
			}

			socket.onmessage = event => {
				try {
					const data = JSON.parse(event.data)
					store.dispatch({ type: 'WS_GET_MESSAGE', payload: data })
				} catch (err) {
					console.error('WebSocket parse error:', err)
				}
			}
		}

		if (action.type === 'WS_DISCONNECT' && socket) {
			socket.close()
			socket = null
		}

		return next(action)
	}
}
