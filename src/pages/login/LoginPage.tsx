import React from 'react'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/ui/Input/Input'
import styles from './login.module.css'
import { useAppDispatch } from '../../services/hooks'
import { loginUser } from '../../services/slices/authSlice'

const LoginPage = () => {
	const [email, setEmail] = React.useState('')
	const [password, setPassword] = React.useState('')
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		dispatch(loginUser({ email, password }))
			.unwrap()
			.then(() => navigate('/'))
			.catch(console.error)
	}

	return (
		<div className={styles.container}>
			<h1 className={`${styles.title} text text_type_main-medium mb-6`}>
				Вход
			</h1>

			<form className={styles.form} onSubmit={handleSubmit}>
				<div className='mb-6'>
					<Input
						type='email'
						placeholder='E-mail'
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
					/>
				</div>

				<div className='mb-6'>
					<Input
						type='password'
						placeholder='Пароль'
						value={password}
						onChange={e => setPassword(e.target.value)}
						icon='show'
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
						Войти
					</Button>
				</div>
			</form>

			<p
				className={`${styles.link} text text_type_main-default text_color_inactive mb-4`}
			>
				Вы — новый пользователь?{' '}
				<Link to='/register' className={styles.linkText}>
					Зарегистрироваться
				</Link>
			</p>

			<p
				className={`${styles.link} text text_type_main-default text_color_inactive`}
			>
				Забыли пароль?{' '}
				<Link to='/forgot-password' className={styles.linkText}>
					Восстановить пароль
				</Link>
			</p>
		</div>
	)
}

export default LoginPage
