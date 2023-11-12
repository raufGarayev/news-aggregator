import { setUserNewsFilters } from "../redux/slices/news/newsSlice"
import { setDrawer, toggleModal } from "../redux/slices/localSlice"
import { AppDispatch } from "../redux/store"
import { NewsStateType } from "../types/news"

export const handleUserFiltersGlobally = (dispatch: AppDispatch, userLocalFilters: NewsStateType['userFilters'] ) => {
    dispatch(setUserNewsFilters(userLocalFilters))
    dispatch(toggleModal(''))
    dispatch(setDrawer({type: 'default'}))
    localStorage.setItem('userFilters', JSON.stringify(userLocalFilters))
}