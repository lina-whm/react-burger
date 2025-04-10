import { useState, useEffect } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { logoutUser } from '../../services/slices/authSlice'
import { useAppDispatch, useAppSelector } from '../../services/hooks'
import styles from './profile.module.css'

const ProfilePage = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const location = useLocation()
	const { user } = useAppSelector(state => state.auth)
	const [isEditing, setIsEditing] = useState(false)
	const [formData, setFormData] = useState({
		name: user?.name || '',
		email: user?.email || '',
		password: '******',
	})

	useEffect(() => {
		if (user) {
			setFormData({
				name: user.name,
				email: user.email,
				password: '******',
			})
		}
	}, [user])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	const handleLogout = () => {
		dispatch(logoutUser())
		navigate('/login')
	}

	const handleCancel = () => {
		setIsEditing(false)
		if (user) {
			setFormData({
				name: user.name,
				email: user.email,
				password: '******',
			})
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.sidebar}>
				<nav className={styles.nav}>
					<Link
						to='/profile'
						className={`${styles.link} text text_type_main-medium ${
							location.pathname === '/profile' ? styles.active : ''
						}`}
					>
						Профиль
					</Link>
					<Link
						to='/profile/orders'
						className={`${styles.link} text text_type_main-medium ${
							location.pathname.includes('/profile/orders') ? styles.active : ''
						}`}
					>
						История заказов
					</Link>
					<button
						onClick={handleLogout}
						className={`${styles.link} text text_type_main-medium`}
					>
						Выход
					</button>
				</nav>
				<p
					className={`${styles.note} text text_type_main-default text_color_inactive`}
				>
					В этом разделе вы можете изменить свои персональные данные
				</p>
			</div>

			<div className={styles.content}>
				{location.pathname === '/profile' ? (
					<form className={styles.form}>
						<div className='mb-6'>
							<input
								type='text'
								name='name'
								value={formData.name}
								onChange={handleInputChange}
								disabled={!isEditing}
								className={`${styles.input} text text_type_main-default`}
								placeholder='Имя'
							/>
						</div>
						<div className='mb-6'>
							<input
								type='email'
								name='email'
								value={formData.email}
								onChange={handleInputChange}
								disabled={!isEditing}
								className={`${styles.input} text text_type_main-default`}
								placeholder='Логин'
							/>
						</div>
						<div className='mb-6'>
							<input
								type='password'
								name='password'
								value={formData.password}
								onChange={handleInputChange}
								disabled={!isEditing}
								className={`${styles.input} text text_type_main-default`}
								placeholder='Пароль'
							/>
						</div>
						{isEditing ? (
							<div className={styles.buttons}>
								<Button
									type='secondary'
									size='medium'
									onClick={handleCancel}
									htmlType='button'
								>
									Отмена
								</Button>
								<Button type='primary' size='medium' htmlType='submit'>
									Сохранить
								</Button>
							</div>
						) : (
							<Button
								type='primary'
								size='medium'
								onClick={() => setIsEditing(true)}
								htmlType='button'
							>
								Редактировать
							</Button>
						)}
					</form>
				) : (
					<Outlet />
				)}
			</div>
		</div>
	)
}

export default ProfilePage
