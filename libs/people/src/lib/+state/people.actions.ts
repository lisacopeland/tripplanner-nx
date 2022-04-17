import { createAction, props } from '@ngrx/store';
import { Person } from '../people.model';

export const loadPeopleAction = createAction(
    'People: Load All',
    props<{ search: Partial<Person> }>()
)
export const setPeopleAction = createAction(
    'People: Set All',
    props<{ payload: Person[] }>()
)
export const setCurrentPersonAction = createAction(
    'People: Set Current',
    props<{ id: string }>()
);
export const createPersonAction = createAction(
    'People: Create',
    props<{ payload: Person }>()
);
export const personCreatedAction = createAction(
    'People: Created',
    props<{ payload: { person: Person } }>()
);
export const updatePersonAction = createAction(
    'People: Update',
    props<{ id: string; changes: Person }>()
);
export const personUpdatedAction = createAction(
    'People: Updated',
    props<{ payload: { changes: Partial<Person> } }>()
);
export const deletePersonAction = createAction(
    'People: Delete',
    props<{ aid: string, id: string }>()
);
export const personDeletedAction = createAction(
    'People: Deleted',
    props<{ payload: { id: string } }>()
);