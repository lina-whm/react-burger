import React from 'react'
import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'

const AppHeader = () => {
	return (
		<header className={`${styles.header} pt-4 pb-4`}>
			<nav className={styles.nav}>
				<div className={styles.leftMenu}>
					<BurgerIcon type='primary' />
					<span className='text text_type_main-default ml-2'>Конструктор</span>
					<ListIcon type='secondary' className='ml-8' />
					<span className='text text_type_main-default text_color_inactive ml-2'>
						Лента заказов
					</span>
				</div>
				<Logo />
				<div className={styles.rightMenu}>
					<ProfileIcon type='secondary' />
					<span className='text text_type_main-default text_color_inactive ml-2'>
						Личный кабинет
					</span>
				</div>
			</nav>
		</header>
	)
}

export default AppHeader
