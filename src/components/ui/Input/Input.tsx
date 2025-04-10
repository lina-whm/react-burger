import React, { InputHTMLAttributes, useState } from 'react'
import styles from './Input.module.css'
import {
	ShowIcon,
	HideIcon,
	EditIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	value: string
	placeholder?: string
	icon?: 'show' | 'hide' | 'edit'
	error?: boolean
	errorText?: string
	extraClass?: string
}

const Input: React.FC<InputProps> = ({
	type = 'text',
	icon,
	error = false,
	errorText = '',
	extraClass = '',
	...rest
}) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)

	const handleIconClick = () => {
		if (icon === 'show' || icon === 'hide') {
			setIsPasswordVisible(!isPasswordVisible)
		}
	}

	const renderIcon = () => {
		const iconProps = {
			type: 'secondary' as const,
			onClick: handleIconClick,
		}

		switch (icon) {
			case 'show':
				return <ShowIcon {...iconProps} />
			case 'hide':
				return <HideIcon {...iconProps} />
			case 'edit':
				return <EditIcon {...iconProps} />
			default:
				return null
		}
	}

	const inputType =
		icon === 'show' || icon === 'hide'
			? isPasswordVisible
				? 'text'
				: 'password'
			: type

	return (
		<div className={`${styles.wrapper} ${extraClass}`}>
			<div className={styles.container}>
				<input
					className={`${styles.input} text text_type_main-default`}
					type={inputType}
					{...rest}
				/>
				{icon && (
					<div className={styles.icon} onClick={handleIconClick}>
						{renderIcon()}
					</div>
				)}
			</div>
			{error && errorText && (
				<p className={`${styles.error} text text_type_main-default mt-2`}>
					{errorText}
				</p>
			)}
		</div>
	)
}

export default Input
