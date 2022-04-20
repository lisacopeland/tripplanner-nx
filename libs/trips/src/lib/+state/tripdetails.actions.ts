import { createAction, props } from '@ngrx/store';
import { TripDetail } from '../trip-details.model';

export const loadTripDetailsAction = createAction(
    'TripDetails: Load All',
    props<{ search: Partial<TripDetail> }>()
)
export const setTripDetailsAction = createAction(
    'TripDetails: Set All',
    props<{ payload: TripDetail[] }>()
)
export const setCurrentTripDetailAction = createAction(
    'TripDetails: Set Current',
    props<{ id: string }>()
);
export const createTripDetailAction = createAction(
    'TripDetails: Create',
    props<{ payload: TripDetail }>()
);
export const tripDetailCreatedAction = createAction(
    'TripDetails: Created',
    props<{ payload: { tripDetail: TripDetail } }>()
);
export const updateTripDetailAction = createAction(
    'TripDetails: Update',
    props<{ id: string; changes: TripDetail }>()
);
export const tripDetailUpdatedAction = createAction(
    'TripDetails: Updated',
    props<{ payload: { changes: Partial<TripDetail> } }>()
);
export const deleteTripDetailAction = createAction(
    'TripDetails: Delete',
    props<{ aid: string, tripId: string, id: string }>()
);
export const tripDetailDeletedAction = createAction(
    'TripDetails: Deleted',
    props<{ payload: { id: string } }>()
);