import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
	register as apiRegister,
	login as apiLogin,
	logout as apiLogout,
	refreshToken as apiRefreshToken,
	getUser,
	updateUser,
	forgotPassword as apiForgotPassword,
	resetPassword as apiResetPassword,
} from '../api/authApi'
import { setCookie, getCookie, deleteCookie } from '../utils/cookies'

interface IUser {
	email: string
	name: string
}

interface IAuthState {
	user: IUser | null
	isAuth: boolean
	isLoading: boolean
	error: string | null
	forgotPasswordRequest: boolean
	resetPasswordRequest: boolean
}

const initialState: IAuthState = {
	user: null,
	isAuth: false,
	isLoading: false,
	error: null,
	forgotPasswordRequest: false,
	resetPasswordRequest: false,
}

export const registerUser = createAsyncThunk(
	'auth/register',
	async (
		data: { email: string; password: string; name: string },
		{ rejectWithValue }
	) => {
		try {
			const res = await apiRegister(data)
			setCookie('accessToken', res.accessToken.split('Bearer ')[1], 20 * 60)
			localStorage.setItem('refreshToken', res.refreshToken)
			return res.user
		} catch (error: any) {
			return rejectWithValue(error.message)
		}
	}
)

export const loginUser = createAsyncThunk(
	'auth/login',
	async (data: { email: string; password: string }, { rejectWithValue }) => {
		try {
			const res = await apiLogin(data)
			setCookie('accessToken', res.accessToken.split('Bearer ')[1], 20 * 60) 
			localStorage.setItem('refreshToken', res.refreshToken)
			return res.user
		} catch (error: any) {
			return rejectWithValue(error.message)
		}
	}
)

export const logoutUser = createAsyncThunk(
	'auth/logout',
	async (_, { rejectWithValue }) => {
		try {
			const refreshToken = localStorage.getItem('refreshToken')
			if (refreshToken) {
				await apiLogout(refreshToken)
			}
			deleteCookie('accessToken')
			localStorage.removeItem('refreshToken')
			return true
		} catch (error: any) {
			return rejectWithValue(error.message)
		}
	}
)

export const checkUserAuth = createAsyncThunk(
	'auth/checkAuth',
	async (_, { rejectWithValue, dispatch }) => {
		try {
			const refreshToken = localStorage.getItem('refreshToken')
			if (!refreshToken) {
				throw new Error('No refresh token')
			}

			const tokenData = await apiRefreshToken(refreshToken)
			setCookie(
				'accessToken',
				tokenData.accessToken.split('Bearer ')[1],
				20 * 60
			) 
			localStorage.setItem('refreshToken', tokenData.refreshToken)

			const userData = await dispatch(fetchUser()).unwrap()
			return userData
		} catch (error: any) {
			dispatch(logoutUser())
			return rejectWithValue(error.message)
		}
	}
)

export const fetchUser = createAsyncThunk(
	'auth/fetchUser',
	async (_, { rejectWithValue }) => {
		try {
			const res = await getUser()
			return res.user
		} catch (error: any) {
			return rejectWithValue(error.message)
		}
	}
)

export const updateUserInfo = createAsyncThunk(
	'auth/updateUser',
	async (
		data: { email?: string; name?: string; password?: string },
		{ rejectWithValue }
	) => {
		try {
			const res = await updateUser(data)
			return res.user
		} catch (error: any) {
			return rejectWithValue(error.message)
		}
	}
)

export const requestPasswordReset = createAsyncThunk(
	'auth/forgotPassword',
	async (email: string, { rejectWithValue }) => {
		try {
			const res = await apiForgotPassword(email)
			return res.success
		} catch (error: any) {
			return rejectWithValue(error.message)
		}
	}
)

export const confirmPasswordReset = createAsyncThunk(
	'auth/resetPassword',
	async (data: { password: string; token: string }, { rejectWithValue }) => {
		try {
			const res = await apiResetPassword(data)
			return res.success
		} catch (error: any) {
			return rejectWithValue(error.message)
		}
	}
)

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setForgotPasswordRequest: (state, action) => {
			state.forgotPasswordRequest = action.payload
		},
		setResetPasswordRequest: (state, action) => {
			state.resetPasswordRequest = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(registerUser.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.isLoading = false
				state.user = action.payload
				state.isAuth = true
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload as string
			})
			.addCase(loginUser.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isLoading = false
				state.user = action.payload
				state.isAuth = true
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload as string
			})
			.addCase(logoutUser.pending, state => {
				state.isLoading = true
			})
			.addCase(logoutUser.fulfilled, state => {
				state.isLoading = false
				state.user = null
				state.isAuth = false
			})
			.addCase(checkUserAuth.pending, state => {
				state.isLoading = true
			})
			.addCase(checkUserAuth.fulfilled, (state, action) => {
				state.isLoading = false
				state.user = action.payload
				state.isAuth = true
			})
			.addCase(checkUserAuth.rejected, state => {
				state.isLoading = false
			})
			.addCase(fetchUser.fulfilled, (state, action) => {
				state.user = action.payload
			})
			.addCase(updateUserInfo.fulfilled, (state, action) => {
				state.user = action.payload
			})
			.addCase(requestPasswordReset.fulfilled, state => {
				state.forgotPasswordRequest = true
			})
			.addCase(confirmPasswordReset.fulfilled, state => {
				state.resetPasswordRequest = true
			})
	},
})

export const selectIsAuth = (state: { auth: IAuthState }) => state.auth.isAuth
export const { setForgotPasswordRequest, setResetPasswordRequest } =
	authSlice.actions
export default authSlice.reducer
