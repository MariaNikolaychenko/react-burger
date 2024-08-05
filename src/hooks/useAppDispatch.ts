
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../services/types'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()