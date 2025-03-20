import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

const AppHeader = () => {
	const location = useLocation();

	const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
		`${styles.link} text text_type_main-default ml-2 ${
			isActive ? styles.activeLink : ''
		}`;

	return (
		<header className={`${styles.header} pt-4 pb-4`}>
			<nav className={styles.nav}>
				<div className={styles.leftMenu}>
					<NavLink
						to='/'
						className={getNavLinkClass}
						end 
					>
						<BurgerIcon
							type={location.pathname === '/' ? 'primary' : 'secondary'}
						/>
						Конструктор
					</NavLink>
					<NavLink to='/feed' className={getNavLinkClass} end>
						<ListIcon
							type={location.pathname === '/feed' ? 'primary' : 'secondary'}
							className='ml-8'
						/>
						Лента заказов
					</NavLink>
				</div>
				<Logo />
				<div className={styles.rightMenu}>
					<NavLink
						to='/profile'
						className={({ isActive }) =>
							`${styles.link} text text_type_main-default ml-2 ${
								isActive ? styles.activeLink : ''
							}`
						}>
						<ProfileIcon
							type={
								location.pathname.startsWith('/profile')
									? 'primary'
									: 'secondary'
							}
						/>
						Личный кабинет
					</NavLink>
				</div>
			</nav>
		</header>
	);
};

export default AppHeader;
