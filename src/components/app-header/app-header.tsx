import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
	MenuIcon,
	CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'

const AppHeader = () => {
	const location = useLocation()
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
		`${styles.link} text text_type_main-default ml-2 ${
			isActive ? styles.activeLink : ''
		}`

	const toggleMobileMenu = () => {
		setMobileMenuOpen(!mobileMenuOpen)
	}

	const closeMobileMenu = () => {
		setMobileMenuOpen(false)
	}

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

				<div className={styles.logo}>
					<NavLink to='/'>
						<Logo />
					</NavLink>
				</div>

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

				<button 
					className={styles.menuButton} 
					onClick={toggleMobileMenu}
					aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
				>
					{mobileMenuOpen ? (
						<CloseIcon type='primary' />
					) : (
						<MenuIcon type='primary' />
					)}
				</button>
			</nav>

			<div 
				className={`${styles.overlay} ${mobileMenuOpen ? styles.overlayOpen : ''}`}
				onClick={closeMobileMenu}
			/>

			<div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
				<button 
					className={styles.closeButton}
					onClick={closeMobileMenu}
					aria-label='Закрыть меню'
				>
					<CloseIcon type='primary' />
				</button>

				<NavLink 
					to='/' 
					className={getNavLinkClass} 
					end
					onClick={closeMobileMenu}
				>
					<BurgerIcon
						type={location.pathname === '/' ? 'primary' : 'secondary'}
					/>
					<span className='ml-2'>Конструктор</span>
				</NavLink>

				<NavLink 
					to='/feed' 
					className={getNavLinkClass}
					onClick={closeMobileMenu}
				>
					<ListIcon
						type={
							location.pathname.startsWith('/feed') ? 'primary' : 'secondary'
						}
					/>
					<span className='ml-2'>Лента заказов</span>
				</NavLink>

				<NavLink 
					to='/profile' 
					className={getNavLinkClass}
					onClick={closeMobileMenu}
				>
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
		</header>
	)
}

export default AppHeader