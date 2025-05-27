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

export const socketMiddleware = (): Middleware => {
	return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
		let socket: WebSocket | null = null
		let isConnected = false
		let reconnectTimer = 0

		const closeConnection = () => {
			if (socket) {
				socket.close()
				socket = null
				isConnected = false
			}
			if (reconnectTimer) {
				clearTimeout(reconnectTimer)
				reconnectTimer = 0
			}
		}

		const connect = (url: string, withToken: boolean) => {
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
			isConnected = false

			socket.onopen = () => {
				isConnected = true
				store.dispatch(wsConnectionSuccess())
			}

			socket.onerror = event => {
				console.error('WebSocket error:', event)
				if (!isConnected) {
					store.dispatch(wsConnectionError('Ошибка подключения'))
				}
			}

			socket.onclose = event => {
				if (event.wasClean) {
					store.dispatch(wsConnectionClosed())
				} else {
					store.dispatch(wsConnectionError('Соединение прервано'))
					reconnectTimer = window.setTimeout(() => {
						connect(url, withToken)
					}, 5000)
				}
				isConnected = false
			}

			socket.onmessage = event => {
				try {
					const data = JSON.parse(event.data)
					if (data.message === 'Invalid or missing token') {
						store
							.dispatch(refreshTokens())
							.then(() => {
								const newToken = localStorage
									.getItem('accessToken')
									?.replace('Bearer ', '')
								if (newToken) {
									connect(url, true) 
								}
							})
							.catch(() => {
								store.dispatch(logoutUser())
							})
					} else {
						store.dispatch(wsGetOrders(data))
					}
				} catch (err) {
					console.error('Ошибка обработки сообщения:', err)
					store.dispatch(wsConnectionError('Ошибка обработки данных'))
				}
			}
		}

		return next => action => {
			const { dispatch } = store
			const { type, payload } = action

			switch (type) {
				case wsConnectionStart.type: {
					const { url, withToken } = payload
					connect(url, withToken)
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
