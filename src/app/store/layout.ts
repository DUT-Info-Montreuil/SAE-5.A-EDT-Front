import { createAction, createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';

export interface LayoutState {
    sideBarCollapsed: boolean;
    overflowYHidden: boolean;
}

export const initialState: LayoutState = {
    sideBarCollapsed: false,
    overflowYHidden: false,
};

export const setSideBarCollapsed = createAction('[Layout] Set SideBar Collapsed', (sideBarCollapsed: boolean) => ({ sideBarCollapsed }));
export const setOverflowYHidden = createAction('[Layout] Set OverflowY Hidden', (overflowYHidden: boolean) => ({ overflowYHidden }));

export const layoutReducer = createReducer(
    initialState,
    on(setSideBarCollapsed, (state, { sideBarCollapsed }) => ({ ...state, sideBarCollapsed })),
    on(setOverflowYHidden, (state, { overflowYHidden }) => ({ ...state, overflowYHidden }))
);

const getLayoutFeatureState = createFeatureSelector<LayoutState>('layout');

export const selectSideBarCollapsed = createSelector(getLayoutFeatureState, (state) => state.sideBarCollapsed);

export const selectOverflowYHidden = createSelector(getLayoutFeatureState, (state) => state.overflowYHidden);
