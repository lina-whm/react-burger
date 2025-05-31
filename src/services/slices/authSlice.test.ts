import authReducer, {
	loginUser,
	logoutUser,
	registerUser,
	updateUserInfo,
	refreshTokens,
	checkUserAuth,
} from './authSlice'

describe('authSlice', () => {
	const initialState = authReducer(undefined, { type: '' })
	const mockUser = { email: 'test@test.com', name: 'Test User' }

	it('should return initial state', () => {
		expect(authReducer(undefined, { type: '' })).toEqual(initialState)
	})

	it('should handle registerUser.pending', () => {
		const state = authReducer(
			initialState,
			registerUser.pending('', { email: '', password: '', name: '' })
		)
		expect(state).toEqual({
			...initialState,
			isLoading: true,
			error: null,
		})
	})

	it('should handle registerUser.fulfilled', () => {
		const state = authReducer(
			initialState,
			registerUser.fulfilled(mockUser, '', {
				email: 'test@test.com',
				password: '123456',
				name: 'Test User',
			})
		)
		expect(state).toEqual({
			...initialState,
			user: mockUser,
			isAuth: true,
			isLoading: false,
		})
	})

	it('should handle loginUser.fulfilled', () => {
		const state = authReducer(
			initialState,
			loginUser.fulfilled(mockUser, '', {
				email: 'test@test.com',
				password: '123456',
			})
		)
		expect(state).toEqual({
			...initialState,
			user: mockUser,
			isAuth: true,
			isLoading: false,
		})
	})

	it('should handle logoutUser.fulfilled', () => {
		const loggedInState = { ...initialState, user: mockUser, isAuth: true }
		const state = authReducer(loggedInState, logoutUser.fulfilled)
		expect(state).toEqual(initialState)
	})
})
