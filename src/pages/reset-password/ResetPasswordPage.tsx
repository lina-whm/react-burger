import React from 'react'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/ui/Input/Input'
import styles from './reset-password.module.css'
import { useAppDispatch } from '../../services/hooks'
import { confirmPasswordReset } from '../../services/slices/authSlice'

const ResetPasswordPage = () => {
	const [password, setPassword] = React.useState('')
	const [token, setToken] = React.useState('')
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		dispatch(confirmPasswordReset({ password, token }))
			.unwrap()
			.then(() => {
				localStorage.removeItem('resetPassword')
				navigate('/login')
			})
			.catch(console.error)
	}

	return (
		<div className={styles.container}>
			<h1 className={`${styles.title} text text_type_main-medium mb-6`}>
				Восстановление пароля
			</h1>

			<form className={styles.form} onSubmit={handleSubmit}>
				<Input
					type='password'
					placeholder='Введите новый пароль'
					value={password}
					onChange={e => setPassword(e.target.value)}
					icon='show'
					extraClass='mb-6'
					required
				/>

				<Input
					type='text'
					placeholder='Введите код из письма'
					value={token}
					onChange={e => setToken(e.target.value)}
					extraClass='mb-6'
					required
				/>

				<Button
					type='primary'
					size='medium'
					htmlType='submit'
					extraClass={`${styles.button} mb-20`}
				>
					Сохранить
				</Button>
			</form>

			<p
				className={`${styles.link} text text_type_main-default text_color_inactive`}
			>
				Вспомнили пароль?{' '}
				<Link to='/login' className={styles.linkText}>
					Войти
				</Link>
			</p>
		</div>
	)
}

export default ResetPasswordPage
