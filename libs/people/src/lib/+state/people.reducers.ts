import {
    createFeatureSelector,
    createReducer,
    createSelector,
    on,
} from '@ngrx/store';
import { Person, mapToPeople, mapToPerson } from '@tripplanner-nx/people';
import {
    loadPeopleAction,
    setPeopleAction,
    personCreatedAction,
    personUpdatedAction,
    personDeletedAction,
    setCurrentPersonAction,
} from './people.actions';

export interface PeopleState {
    people: Person[];
    current: string;
    currentPerson: Person;
    peopleLoaded: boolean;
}

const initialState: PeopleState = {
    current: '',
    currentPerson: null,
    people: [],
    peopleLoaded: false
};

export const PEOPLE_FEATURE_KEY = 'people';

export const peopleReducer = createReducer(
    initialState,
    on(loadPeopleAction, (state, action) => {
        const newState = initialState;
        return newState;
    }),
    on(setPeopleAction, (state, action) => {
        console.log('setting people action!');
        const newState = { ...state, people: action.payload, peopleLoaded: true };
        return newState;
    }),
    on(personCreatedAction, (state, action) => {
        const people = [...state.people];
        people.push(action.payload.person);
        const newState = { ...state, people: people };
        return newState;
    }),
    on(setCurrentPersonAction, (state, action) => {
        let newState = { ...state };
        const idx = state.people.findIndex(x => x.id === action.id);
        if (idx !== -1) {
            const currentPerson = mapToPerson(state.people[idx]);
            const people = [...state.people];
            people[idx] = currentPerson;
            newState = { ...state, people: people, currentPerson: currentPerson, current: action.id };
            return newState;
        } else {
           return newState;
        }
    }),    
    on(personUpdatedAction, (state, action) => {
        const people = [...state.people];
        const idx = people.findIndex(x => x.id === action.payload.changes.id);
        const updatedPerson = new Person({
            ...state.people[idx],
            ...action.payload.changes,
        });
        people.splice(idx, 1, updatedPerson)
        const newState = { ...state, people: people };
        return newState;
    }),
    on(personDeletedAction, (state, action) => {
        const people = [...state.people];
        const idx = people.findIndex(x => x.id === action.payload.id);
        people.splice(idx, 1)
        const newState = { ...state, people: people };
        return newState;
    })
);

export const getPeopleState = createFeatureSelector<PeopleState>(PEOPLE_FEATURE_KEY);

export const selectAll = createSelector(
    getPeopleState,
    (state: PeopleState) => state
);

export const selectAllPeople = createSelector(selectAll, (state) => {
    console.log('select all people!');
    return mapToPeople(state.people)
});

export const selectPeopleLoaded = createSelector(selectAll, (state) =>
    state.peopleLoaded
);

export const selectCurrentPerson = createSelector(selectAll, (state) =>
    state.currentPerson
);