import { createAction, createReducer, on, createFeatureSelector, createSelector, props } from '@ngrx/store';

export interface LayoutState {
    sideBarCollapsed: boolean;
    overflowYHidden: boolean;
    darkMode: boolean;
}

export const initialState: LayoutState = {
    sideBarCollapsed: false,
    overflowYHidden: false,
    darkMode: false,
};

export const setSideBarCollapsed = createAction('[Layout] Set SideBar Collapsed', (sideBarCollapsed: boolean) => ({ sideBarCollapsed }));
export const setOverflowYHidden = createAction('[Layout] Set OverflowY Hidden', (overflowYHidden: boolean) => ({ overflowYHidden }));
export const setDarkMode = createAction('[Layout] Set Dark Mode', props<{ darkMode: boolean }>());

export const layoutReducer = createReducer(
    initialState,
    on(setSideBarCollapsed, (state, { sideBarCollapsed }) => ({ ...state, sideBarCollapsed })),
    on(setOverflowYHidden, (state, { overflowYHidden }) => ({ ...state, overflowYHidden })),
    on(setDarkMode, (state, { darkMode }) => ({ ...state, darkMode }))
);

const getLayoutFeatureState = createFeatureSelector<LayoutState>('layout');

export const selectSideBarCollapsed = createSelector(getLayoutFeatureState, (state) => state.sideBarCollapsed);
export const selectOverflowYHidden = createSelector(getLayoutFeatureState, (state) => state.overflowYHidden);
export const selectDarkMode = createSelector(getLayoutFeatureState, (state) => state.darkMode);
