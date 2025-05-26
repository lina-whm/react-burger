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

		return next => action => {
			const { dispatch } = store
			const { type, payload } = action

			if (type === wsConnectionStart.type) {
				const { url, withToken } = payload
				const token = withToken
					? localStorage.getItem('accessToken')?.replace('Bearer ', '')
					: undefined

				if (withToken && !token) {
					dispatch(logoutUser())
					return
				}

				socket = new WebSocket(
					withToken && token ? `${url}?token=${token}` : url
				)
			}

			if (socket) {
				socket.onopen = () => {
					dispatch(wsConnectionSuccess())
				}

				socket.onerror = event => {
					dispatch(wsConnectionError('WebSocket error'))
					console.error('WebSocket error:', event)
				}

				socket.onclose = event => {
					if (event.wasClean) {
						dispatch(wsConnectionClosed())
					} else {
						dispatch(wsConnectionError('Connection closed unexpectedly'))
					}
				}

				socket.onmessage = event => {
					try {
						const data = JSON.parse(event.data)
						if (data.message === 'Invalid or missing token') {
							dispatch(refreshTokens())
								.then(() => {
									const newToken = localStorage
										.getItem('accessToken')
										?.replace('Bearer ', '')
									if (socket && newToken) {
										socket.close()
										socket = new WebSocket(`${payload.url}?token=${newToken}`)
									}
								})
								.catch(() => {
									dispatch(logoutUser())
								})
						} else {
							dispatch(wsGetOrders(data))
						}
					} catch (err) {
						console.error('WebSocket message error:', err)
						dispatch(wsConnectionError('Error parsing WebSocket message'))
					}
				}

				if (type === wsConnectionClosed.type && socket) {
					socket.close()
				}
			}

			next(action)
		}
	}) as Middleware
}
