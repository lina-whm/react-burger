import { request } from '../../components/utils/api'
import { getCookie } from '../../services/utils/cookies'

interface IUser {
	email: string
	name: string
}

interface IAuthResponse {
	success: boolean
	accessToken: string
	refreshToken: string
	user: IUser
}

interface IResetPasswordResponse {
	success: boolean
	message: string
}

export const register = (data: {
	email: string
	password: string
	name: string
}) => {
	return request<IAuthResponse>('/auth/register', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	})
}

export const login = (data: { email: string; password: string }) => {
	return request<IAuthResponse>('/auth/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	})
}

export const logout = (token: string) => {
	return request<IResetPasswordResponse>('/auth/logout', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ token }),
	})
}

export const refreshToken = (token: string) => {
	return request<{
		success: boolean
		accessToken: string
		refreshToken: string
	}>('/auth/token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ token }),
	})
}

export const getUser = () => {
	return request<{ success: boolean; user: IUser }>('/auth/user', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${getCookie('accessToken')}`,
		},
	})
}

export const updateUser = (data: {
	email?: string
	name?: string
	password?: string
}) => {
	return request<{ success: boolean; user: IUser }>('/auth/user', {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${getCookie('accessToken')}`,
		},
		body: JSON.stringify(data),
	})
}

export const forgotPassword = (email: string) => {
	return request<IResetPasswordResponse>('/password-reset', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email }),
	})
}

export const resetPassword = (data: { password: string; token: string }) => {
	return request<IResetPasswordResponse>('/password-reset/reset', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	})
}
