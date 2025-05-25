import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'

const AppHeader = () => {
	const location = useLocation()

	const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
		`${styles.link} text text_type_main-default ml-2 ${
			isActive ? styles.activeLink : ''
		}`

	return (
		<header className={`${styles.header} pt-4 pb-4`}>
			<nav className={styles.nav}>
				<div className={styles.leftMenu}>
					<NavLink to='/' className={getNavLinkClass} end>
						<BurgerIcon
							type={location.pathname === '/' ? 'primary' : 'secondary'}
						/>
						<span className='ml-2'>Конструктор</span>
					</NavLink>

					<NavLink to='/feed' className={getNavLinkClass}>
						<ListIcon
							type={
								location.pathname.startsWith('/feed') ? 'primary' : 'secondary'
							}
							className='ml-8'
						/>
						<span className='ml-2'>Лента заказов</span>
					</NavLink>
				</div>

				<NavLink to='/'>
					<Logo />
				</NavLink>

				<div className={styles.rightMenu}>
					<NavLink to='/profile' className={getNavLinkClass}>
						<ProfileIcon
							type={
								location.pathname.startsWith('/profile')
									? 'primary'
									: 'secondary'
							}
						/>
						<span className='ml-2'>Личный кабинет</span>
					</NavLink>
				</div>
			</nav>
		</header>
	)
}

export default AppHeader
