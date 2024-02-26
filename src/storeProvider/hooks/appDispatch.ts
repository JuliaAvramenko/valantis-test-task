import { useDispatch } from 'react-redux'
import { AppDispatch } from '../storeProvider'

export const useAppDispatch: () => AppDispatch = useDispatch
