import { FC } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../services/hooks'

const UnauthRoute: FC<{ children: JSX.Element }> = ({ children }) => {
	const location = useLocation()
	const { isAuth } = useAppSelector(state => state.auth)

	if (isAuth) {
		return <Navigate to={location.state?.from || '/'} replace />
	}

	return children
}

export default UnauthRoute
