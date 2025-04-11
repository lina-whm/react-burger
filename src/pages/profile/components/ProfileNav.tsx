import { NavLink } from 'react-router-dom'
import styles from '../profile.module.css'

const ProfileNav = () => {
	return (
		<nav className={styles.nav}>
			<NavLink
				to='/profile'
				end
				className={({ isActive }) =>
					`${styles.link} text text_type_main-medium ${
						isActive ? styles.active : ''
					}`
				}
			>
				Профиль
			</NavLink>
			<NavLink
				to='/profile/orders'
				className={({ isActive }) =>
					`${styles.link} text text_type_main-medium ${
						isActive ? styles.active : ''
					}`
				}
			>
				История заказов
			</NavLink>
			<button className={`${styles.link} text text_type_main-medium`}>
				Выход
			</button>
			<p
				className={`${styles.note} text text_type_main-default text_color_inactive`}
			>
				В этом разделе вы можете изменить свои персональные данные
			</p>
		</nav>
	)
}

export default ProfileNav
