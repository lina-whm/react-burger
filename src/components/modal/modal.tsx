import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../modal-overlay/modal-overlay'
import styles from './modal.module.css'

interface ModalProps {
	onClose: () => void
	children: React.ReactNode
	title?: string
}

const Modal: React.FC<ModalProps> = ({ onClose, children, title }) => {
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose()
		}

		document.addEventListener('keydown', handleEscape)
		return () => document.removeEventListener('keydown', handleEscape)
	}, [onClose])

	const modalsRoot = document.getElementById('modals')
	if (!modalsRoot) return null

	return ReactDOM.createPortal(
		<>
			<ModalOverlay onClose={onClose} />
			<div className={styles.modal}>
				{title && (
					<div className={styles.header}>
						<h2 className={styles.title}>{title}</h2>
						<button
							className={styles.close}
							onClick={onClose}
							aria-label='Закрыть модальное окно'
						>
							<CloseIcon type='primary' />
						</button>
					</div>
				)}
				{!title && (
					<button
						className={styles.closeWithoutTitle}
						onClick={onClose}
						aria-label='Закрыть модальное окно'
					>
						<CloseIcon type='primary' />
					</button>
				)}
				{children}
			</div>
		</>,
		modalsRoot
	)
}

export default Modal
