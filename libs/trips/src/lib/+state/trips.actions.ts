import { createAction, props } from '@ngrx/store';
import { Trip } from '@tripplanner-nx/trips';

export const loadTripsAction = createAction(
    'Trips: Load All',
    props<{ search: Partial<Trip> }>()
)
export const setTripsAction = createAction(
    'Trips: Set All',
    props<{ payload: Trip[] }>()
)
export const setCurrentTripAction = createAction(
    'Trips: Set Current',
    props<{ id: string }>()
);
export const createTripAction = createAction(
    'Trips: Create',
    props<{ payload: Trip }>()
);
export const tripCreatedAction = createAction(
    'Trips: Created',
    props<{ payload: { trip: Trip } }>()
);
export const updateTripAction = createAction(
    'Trips: Update',
    props<{ id: string; changes: Trip }>()
);
export const tripUpdatedAction = createAction(
    'Trips: Updated',
    props<{ payload: { changes: Partial<Trip> } }>()
);
export const deleteTripAction = createAction(
    'Trips: Delete',
    props<{ aid: string, id: string }>()
);
export const tripDeletedAction = createAction(
    'Trips: Deleted',
    props<{ payload: { id: string } }>()
);