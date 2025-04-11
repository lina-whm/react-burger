import { Middleware } from '@reduxjs/toolkit'
import { refreshToken } from '../api/authApi'
import { logoutUser } from '../slices/authSlice'
import { getCookie } from '../utils/cookies'
import { AppDispatch, RootState } from '../types'

export const refreshTokenMiddleware: Middleware<
	Record<string, never>,
	RootState,
	AppDispatch
> = store => next => async action => {
	if (action.type.endsWith('/rejected')) {
		const error = action.payload || action.error

		if (error?.message?.includes('jwt expired')) {
			try {
				const refreshTokenValue = localStorage.getItem('refreshToken')
				if (!refreshTokenValue) {
					store.dispatch(logoutUser())
					return next(action)
				}

				const tokenData = await refreshToken(refreshTokenValue)
				const accessToken = tokenData.accessToken.split('Bearer ')[1]
				document.cookie = `accessToken=${accessToken}; max-age=${
					20 * 60
				}; path=/`
				localStorage.setItem('refreshToken', tokenData.refreshToken)

				if (action.meta?.arg) {
					const newAction = {
						...action.meta.arg,
						headers: {
							...action.meta.arg.headers,
							Authorization: `Bearer ${accessToken}`,
						},
					}
					return store.dispatch(newAction)
				}
			} catch (error) {
				store.dispatch(logoutUser())
			}
		}
	}

	return next(action)
}
