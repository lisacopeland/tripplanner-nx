import {
    createFeatureSelector,
    createReducer,
    createSelector,
    on,
} from '@ngrx/store';
import { Person } from '@tripplanner-nx/people';
import { Trip, mapToTrips, mapToTrip } from '../trips.model';
import { selectAllPeople, selectPeopleLoaded } from '@tripplanner-nx/people';
import {
    loadTripsAction,
    setTripsAction,
    tripCreatedAction,
    tripUpdatedAction,
    tripDeletedAction,
    setCurrentTripAction,
} from './trips.actions';

export interface TripWithParticipants {
    trip: Trip;
    people: Person[];
}

export interface TripsState {
    trips: Trip[];
    current: string;
    currentTrip: Trip | null;
    tripsLoaded: boolean;
}

const initialState: TripsState = {
    current: '',
    currentTrip: null,
    trips: [],
    tripsLoaded: false
};

export const TRIPS_FEATURE_KEY = 'trips';

export const tripsReducer = createReducer(
    initialState,
    on(loadTripsAction, (state, action) => {
        const newState = initialState;
        return newState;
    }),
    on(setTripsAction, (state, action) => {
        console.log('set Trips action fired!');
        const newState = { ...state, trips: action.payload, tripsLoaded: true };
        return newState;
    }),
    on(tripCreatedAction, (state, action) => {
        const trips = [...state.trips];
        trips.push(action.payload.trip);
        const newState = { ...state, trips: trips };
        return newState;
    }),
    on(setCurrentTripAction, (state, action) => {
        let newState = { ...state };
        const idx = state.trips.findIndex(x => x.id === action.id);
        if (idx !== -1) {
            const currentTrip = mapToTrip(state.trips[idx]);
            const trips = [...state.trips];
            trips[idx] = currentTrip;
            newState = { ...state, trips: trips, currentTrip: currentTrip, current: action.id };
            return newState;
        } else {
           return newState;
        }
    }),    
    on(tripUpdatedAction, (state, action) => {
        const trips = [...state.trips];
        const idx = trips.findIndex(x => x.id === action.payload.changes.id);
        const updatedTrip = new Trip({
            ...state.trips[idx],
            ...action.payload.changes,
        });
        trips.splice(idx, 1, updatedTrip)
        const newState = { ...state, trips: trips };
        return newState;
    }),
    on(tripDeletedAction, (state, action) => {
        const trips = [...state.trips];
        const idx = trips.findIndex(x => x.id === action.payload.id);
        trips.splice(idx, 1)
        const newState = { ...state, trips: trips };
        return newState;
    })
);

export const getTripsState = createFeatureSelector<TripsState>(TRIPS_FEATURE_KEY);

export const selectAll = createSelector(
    getTripsState,
    (state: TripsState) => state
);

export const selectAllTrips = createSelector(selectAll, (state) => {
    console.log('selectAllTrips!')
    return mapToTrips(state.trips)
});

export const selectTripsLoaded = createSelector(selectAll, (state) => {
    console.log('selectTripsloaded returning ', state.tripsLoaded);
    return state.tripsLoaded
});

export const selectTripsAndPeopleLoaded = createSelector(
    selectTripsLoaded,
    selectPeopleLoaded,
    (tripsLoaded, peopleLoaded) =>  {
        console.log('all loaded :', tripsLoaded, ' ', peopleLoaded);
      return [tripsLoaded, peopleLoaded].every(loaded => loaded === true)
    });

export const selectTripsWithParticipants = createSelector(
    selectAllTrips,
    selectAllPeople,
    (trips, people) => {
        console.log('selectTripsWithPeople firing!');
      const tripsWithPeople: TripWithParticipants[] = trips.map(trip => {
          let participants: Person[] = [];
          if (trip.participants) {
              participants = trip.participants.map(part => {
                  return people.find(x => x.email === part);
              });
          }
          return {
              trip: mapToTrip(trip),
              people: participants
          }
          
      });
      console.log('selectTripswithpeople returning : ', tripsWithPeople);
      return tripsWithPeople;
    })

export const selectCurrentTrip = createSelector(selectAll, (state) =>
    state.currentTrip
);