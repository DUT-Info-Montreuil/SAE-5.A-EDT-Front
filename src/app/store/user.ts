import { createAction, createReducer, on, createFeatureSelector, createSelector, props } from '@ngrx/store';
import { User } from '../models/entities';

export interface UserState {
    user: User | null;
    token: string | null;
}

export const initialState: UserState = {
    user: null,
    token: null,
};

export const setUser = createAction('[User] Set User', props<{ user: User | null; token: string | null }>());
export const resetUser = createAction('[User] Reset User');

const getUserFeatureState = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(getUserFeatureState, (state) => state.user);
export const selectToken = createSelector(getUserFeatureState, (state) => state.token);

export const userReducer = createReducer(
    initialState,
    on(setUser, (state, { user, token }) => ({ ...state, user, token })),
    on(resetUser, (state) => initialState)
);
