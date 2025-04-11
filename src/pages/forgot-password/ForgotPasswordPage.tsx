import React from 'react'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/ui/Input/Input'
import styles from './forgot-password.module.css'
import { useAppDispatch } from '../../services/hooks'
import { requestPasswordReset } from '../../services/slices/authSlice'

const ForgotPasswordPage = () => {
	const [email, setEmail] = React.useState('')
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		dispatch(requestPasswordReset(email))
			.unwrap()
			.then(() => navigate('/reset-password'))
			.catch(console.error)
	}

	return (
		<div className={styles.container}>
			<h1 className={`${styles.title} text text_type_main-medium mb-6`}>
				Восстановление пароля
			</h1>

			<form className={styles.form} onSubmit={handleSubmit}>
				<div className='mb-6'>
					<Input
						type='email'
						placeholder='Укажите e-mail'
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
					/>
				</div>

				<div className={`${styles.button} mb-20`}>
					<Button
						type='primary'
						size='medium'
						htmlType='submit'
						style={{ width: '100%' }}
					>
						Восстановить
					</Button>
				</div>
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

export default ForgotPasswordPage
