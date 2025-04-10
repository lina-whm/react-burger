import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../services/hooks'
import { selectIsAuth } from '../../services/slices/authSlice'

const ResetPasswordRoute: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const location = useLocation()
	const isAuth = useAppSelector(selectIsAuth)
	const hasResetPassword = localStorage.getItem('resetPassword')

	if (isAuth) {
		return <Navigate to='/' state={{ from: location }} />
	}

	if (!hasResetPassword) {
		return <Navigate to='/forgot-password' state={{ from: location }} />
	}

	return <>{children}</>
}

export default ResetPasswordRoute
