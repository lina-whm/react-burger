import { useState, useEffect } from 'react'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useAppDispatch, useAppSelector } from '../../../services/hooks'
import { updateUserInfo } from '../../../services/slices/authSlice'
import styles from '../profile.module.css'

const ProfileForm = () => {
	const dispatch = useAppDispatch()
	const { user } = useAppSelector(state => state.auth)
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	})
	const [isEditing, setIsEditing] = useState(false)

	useEffect(() => {
		if (user) {
			setFormData({
				name: user.name,
				email: user.email,
				password: '******',
			})
		}
	}, [user])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		dispatch(
			updateUserInfo({
				name: formData.name,
				email: formData.email,
				password:
					formData.password !== '******' ? formData.password : undefined,
			})
		)
		setIsEditing(false)
	}

	const handleCancel = () => {
		if (user) {
			setFormData({
				name: user.name,
				email: user.email,
				password: '******',
			})
		}
		setIsEditing(false)
	}

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<div className='mb-6'>
				<input
					type='text'
					name='name'
					value={formData.name}
					onChange={handleChange}
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
					onChange={handleChange}
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
					onChange={handleChange}
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
	)
}

export default ProfileForm
