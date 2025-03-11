import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../modal-overlay/modal-overlay'
import styles from './modal.module.css'

interface ModalProps {
	onClose: () => void
	children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose()
		}
		document.addEventListener('keydown', handleEscape)
		return () => document.removeEventListener('keydown', handleEscape)
	}, [onClose])

	return ReactDOM.createPortal(
		<>
			<ModalOverlay onClose={onClose} />
			<div className={styles.modal}>
				<button className={styles.close} onClick={onClose}>
					<CloseIcon type='primary' />
				</button>
				{children}
			</div>
		</>,
		document.getElementById('modals')!
	)
}

export default Modal
