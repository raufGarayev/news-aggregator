import { createSlice } from "@reduxjs/toolkit";

type ModalType = {
    open: boolean;
    type: 'general' | 'preferences' | 'news' | '';
};

type FilterStateType = {
    open: boolean;
}

type MobileDrawerType = {
    open: boolean;
    type: 'login' | 'categories' | 'userPreferences' | 'sources' | 'date' | 'default' 
}

const initialModalState: ModalType = {
    open: false,
    type: ''
};

const initialFilterState: FilterStateType = {
    open: false,
}

const initialMobileDrawerState: MobileDrawerType = {
    open: false,
    type: 'default'
}

export const localSlice = createSlice({
    name: 'localStates',
    initialState: {
        modal: initialModalState,
        filter: initialFilterState,
        mobileDrawer: initialMobileDrawerState
    },
    reducers: {
        toggleModal: (state, {payload}) => {
            state.modal.open = !state.modal.open
            state.modal.type = payload
        },
        toggleFilter: (state) => {
            state.filter.open = !state.filter.open
        },
        setDrawer: (state, {payload}) => {
            if(payload.hasOwnProperty('type')) state.mobileDrawer.type = payload.type
            if(payload.hasOwnProperty('open')) state.mobileDrawer.open = payload.open
        }
    }
})

export const { toggleModal, toggleFilter, setDrawer } = localSlice.actions

