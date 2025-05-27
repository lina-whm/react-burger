import { FC, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../services/hooks'
import { checkUserAuth } from '../../services/slices/authSlice'

const ProtectedRoute: FC<{ children: JSX.Element }> = ({ children }) => {
	const dispatch = useAppDispatch()
	const location = useLocation()
	const { isAuth, isLoading } = useAppSelector(state => state.auth)

	useEffect(() => {
		dispatch(checkUserAuth())
	}, [dispatch])

	if (isLoading) {
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
					fontSize: '24px',
				}}
			>
				Проверка авторизации...
			</div>
		)
	}

	if (!isAuth) {
		return <Navigate to='/login' state={{ from: location }} replace />
	}

	return children
}

export default ProtectedRoute
