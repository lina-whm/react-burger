import { Middleware, AnyAction } from '@reduxjs/toolkit'
import { logoutUser } from '../slices/authSlice'
import { getCookie, setCookie } from '../utils/cookies'
import { refreshToken } from '../api/authApi'

export const createRefreshTokenMiddleware = (): Middleware => {
	return store => next => async action => {
		const typedStore = store as {
			dispatch: (action: AnyAction) => Promise<any>
		}

		if (action.type.endsWith('/rejected')) {
			const error = action.payload || action.error

			if (
				error?.message?.includes('jwt expired') ||
				error?.message?.includes('jwt malformed')
			) {
				try {
					const refreshTokenValue = localStorage.getItem('refreshToken')
					if (!refreshTokenValue) {
						await typedStore.dispatch(logoutUser() as unknown as AnyAction)
						return next(action)
					}

					const tokenData = await refreshToken(refreshTokenValue)
					const accessToken = tokenData.accessToken.split('Bearer ')[1]
					setCookie('accessToken', accessToken, { expires: 20 * 60 })
					localStorage.setItem('refreshToken', tokenData.refreshToken)

					const originalAction = action.meta?.arg
					if (originalAction) {
						return typedStore.dispatch({
							...originalAction,
							headers: {
								...originalAction.headers,
								Authorization: `Bearer ${accessToken}`,
							},
						} as AnyAction)
					}
				} catch (error) {
					await typedStore.dispatch(logoutUser() as unknown as AnyAction)
				}
			}
		}
		return next(action)
	}
}
