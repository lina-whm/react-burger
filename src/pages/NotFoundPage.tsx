import React from 'react'
import { Link } from 'react-router-dom'
import styles from './not-found.module.css'

const NotFoundPage = () => {
	return (
		<div className={styles.container}>
			<h1 className='text text_type_main-large'>404 - Страница не найдена</h1>
			<p className='text text_type_main-medium mt-10'>
				Запрашиваемая страница не существует. Вернитесь на{' '}
				<Link to='/' className={styles.link}>
					главную
				</Link>
			</p>
		</div>
	)
}

export default NotFoundPage