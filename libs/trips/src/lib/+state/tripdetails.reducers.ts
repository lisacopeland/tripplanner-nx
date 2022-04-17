import {
    createFeatureSelector,
    createReducer,
    createSelector,
    on,
} from '@ngrx/store';
import { TripDetail, mapToTripDetail, mapToTripDetails } from '../trip-details.model';
import {
    loadTripDetailsAction,
    setTripDetailsAction,
    tripDetailCreatedAction,
    tripDetailUpdatedAction,
    tripDetailDeletedAction,
    setCurrentTripDetailAction,
} from './tripdetails.actions';



export interface TripDetailsState {
    tripDetails: TripDetail[] | null;
    current: string;
    currentTripDetail: TripDetail | null;
}

const initialState: TripDetailsState = {
    current: '',
    currentTripDetail: null,
    tripDetails: [],
};

export const TRIPDETAILS_FEATURE_KEY = 'tripdetails';

export const tripDetailsReducer = createReducer(
    initialState,
    on(loadTripDetailsAction, (state, action) => {
        const newState = { ...state, TripDetails: [], currentTripDetail: null, current: ''};
        return newState;
    }),
    on(setTripDetailsAction, (state, action) => {
        const newState = { ...state, TripDetails: action.payload };
        return newState;
    }),
    on(tripDetailCreatedAction, (state, action) => {
        const tripDetails = [...state.tripDetails];
        tripDetails.push(action.payload.TripDetail);
        const newState = { ...state, tripDetails: tripDetails };
        return newState;
    }),
    on(setCurrentTripDetailAction, (state, action) => {
        let newState = { ...state };
        const idx = state.tripDetails.findIndex(x => x.id === action.id);
        if (idx !== -1) {
            const currentTripDetail = mapToTripDetail(state.tripDetails[idx]);
            const tripDetails = [...state.tripDetails];
            tripDetails[idx] = currentTripDetail;
            newState = { ...state, tripDetails: tripDetails, currentTripDetail: currentTripDetail, current: action.id };
            return newState;
        } else {
           return newState;
        }
    }),    
    on(tripDetailUpdatedAction, (state, action) => {
        const tripDetails = [...state.tripDetails];
        const idx = tripDetails.findIndex(x => x.id === action.payload.changes.id);
        const updatedTripDetail = new TripDetail({
            ...state.tripDetails[idx],
            ...action.payload.changes,
        });
        tripDetails.splice(idx, 1, updatedTripDetail)
        const newState = { ...state, tripDetails: tripDetails };
        return newState;
    }),
    on(tripDetailDeletedAction, (state, action) => {
        const tripDetails = [...state.tripDetails];
        const idx = tripDetails.findIndex(x => x.id === action.payload.id);
        tripDetails.splice(idx, 1)
        const newState = { ...state, tripDetails: tripDetails };
        return newState;
    })
);

export const getTripDetailsState = createFeatureSelector<TripDetailsState>(TRIPDETAILS_FEATURE_KEY);

const selectAll = createSelector(
    getTripDetailsState,
    (state: TripDetailsState) => state
);

export const selectAllTripDetails = createSelector(selectAll, (state) =>
    mapToTripDetails(state.tripDetails)
);

export const selectCurrentTripDetail = createSelector(selectAll, (state) =>
    state.currentTripDetail
);