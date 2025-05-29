import { Middleware, MiddlewareAPI } from 'redux'
import { AppDispatch, RootState } from '../store/store'
import { logoutUser, refreshTokens } from '../slices/authSlice'
import {
	wsConnectionStart,
	wsConnectionSuccess,
	wsConnectionError,
	wsConnectionClosed,
	wsGetOrders,
} from '../slices/ordersFeedSlice'

const MAX_RECONNECT_ATTEMPTS = 5

interface WSAction {
	type: string
	payload: {
		url: string
		withToken: boolean
	}
}

export const socketMiddleware = (): Middleware => {
	return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
		let socket: WebSocket | null = null
		let isConnected = false
		let reconnectTimer = 0
		let reconnectAttempts = 0
		let url = ''
		let withToken = false

		const closeConnection = () => {
			if (socket) {
				socket.onopen = null
				socket.onclose = null
				socket.onerror = null
				socket.onmessage = null
				if (socket.readyState === WebSocket.OPEN) {
					socket.close()
				}
				socket = null
			}
			isConnected = false
			reconnectAttempts = 0
			if (reconnectTimer) {
				clearTimeout(reconnectTimer)
				reconnectTimer = 0
			}
		}

		const connect = () => {
			closeConnection()

			const token = withToken
				? localStorage.getItem('accessToken')?.replace('Bearer ', '')
				: undefined

			if (withToken && !token) {
				store.dispatch(logoutUser())
				return
			}

			const wsUrl = withToken && token ? `${url}?token=${token}` : url

			socket = new WebSocket(wsUrl)

			socket.onopen = () => {
				isConnected = true
				reconnectAttempts = 0
				store.dispatch(wsConnectionSuccess())
			}

			socket.onerror = event => {
				console.error('WebSocket error:', event)
				if (!isConnected) {
					store.dispatch(wsConnectionError('Ошибка подключения'))
				}

				if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
					reconnectTimer = window.setTimeout(() => {
						reconnectAttempts++
						connect()
					}, 3000)
				}
			}

			socket.onclose = event => {
				if (event.wasClean) {
					store.dispatch(wsConnectionClosed())
				} else {
					store.dispatch(wsConnectionError('Соединение прервано'))
					if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
						reconnectTimer = window.setTimeout(() => {
							reconnectAttempts++
							connect()
						}, 3000)
					}
				}
				isConnected = false
			}

			socket.onmessage = event => {
				try {
					const data = JSON.parse(event.data)

					if (!data || typeof data !== 'object') {
						store.dispatch(wsConnectionError('Некорректные данные от сервера'))
						return
					}

					if (data.message === 'Invalid or missing token') {
						store
							.dispatch(refreshTokens())
							.then(() => {
								const newToken = localStorage
									.getItem('accessToken')
									?.replace('Bearer ', '')
								if (newToken) {
									connect()
								}
							})
							.catch(() => {
								store.dispatch(logoutUser())
							})
					} else if (data.success && Array.isArray(data.orders)) {
						store.dispatch(wsGetOrders(data))
					} else {
						store.dispatch(
							wsConnectionError(data.message || 'Ошибка данных заказов')
						)
					}
				} catch (err) {
					console.error('Ошибка обработки сообщения:', err)
					store.dispatch(wsConnectionError('Ошибка обработки данных'))
				}
			}
		}

		return next => (action: WSAction) => {
			const { dispatch } = store
			const { type, payload } = action

			switch (type) {
				case wsConnectionStart.type: {
					url = payload.url
					withToken = payload.withToken
					connect()
					break
				}

				case wsConnectionClosed.type: {
					closeConnection()
					break
				}

				default:
					break
			}

			return next(action)
		}
	}) as Middleware
}
