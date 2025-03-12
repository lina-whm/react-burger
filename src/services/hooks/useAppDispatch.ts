import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../services/store/store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
