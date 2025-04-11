import React from 'react'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/ui/Input/Input'
import styles from './register.module.css'
import { useAppDispatch } from '../../services/hooks'
import { registerUser } from '../../services/slices/authSlice'

const RegisterPage = () => {
	const [name, setName] = React.useState('')
	const [email, setEmail] = React.useState('')
	const [password, setPassword] = React.useState('')
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		dispatch(registerUser({ name, email, password }))
			.unwrap()
			.then(() => navigate('/'))
			.catch(console.error)
	}

	return (
		<div className={styles.container}>
			<h1 className={`${styles.title} text text_type_main-medium mb-6`}>
				Регистрация
			</h1>

			<form className={styles.form} onSubmit={handleSubmit}>
				<div className='mb-6'>
					<Input
						type='text'
						placeholder='Имя'
						value={name}
						onChange={e => setName(e.target.value)}
						required
					/>
				</div>

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
						Зарегистрироваться
					</Button>
				</div>
			</form>

			<p
				className={`${styles.link} text text_type_main-default text_color_inactive`}
			>
				Уже зарегистрированы?{' '}
				<Link to='/login' className={styles.linkText}>
					Войти
				</Link>
			</p>
		</div>
	)
}

export default RegisterPage
