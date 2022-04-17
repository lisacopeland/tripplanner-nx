import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map } from "rxjs";
import { PeopleService } from "../people.service";

import { createPersonAction, deletePersonAction, loadPeopleAction, setPeopleAction, personCreatedAction, personDeletedAction, personUpdatedAction, updatePersonAction } from "./people.actions";

@Injectable()
export class PeopleEffects {
    concurrentRequests = 5;

    constructor(
        public service: PeopleService,
        public actions$: Actions
    ) { }

    loadPeople$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadPeopleAction),
            mergeMap((action) => {
                return this.service.query(action.search.account_id, action.search).pipe(
                    map((response) => {
                        console.log('response from query : ', response);
                        return setPeopleAction({ payload: response });
                    })
                );
            }, this.concurrentRequests)
        )
    );

    createPerson$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createPersonAction),
            mergeMap((action) => {
                return this.service.create(action.payload).pipe(
                    map((response) => {
                        console.log('response from query : ', response);
                        return personCreatedAction({ payload: { person: response }});
                    })
                );
            }, this.concurrentRequests)
        )
    );
    updatePerson$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updatePersonAction),
            mergeMap((action) => {
                return this.service.update(action.changes).pipe(
                    map((response) => {
                        console.log('response from query : ', response);
                        return personUpdatedAction({ payload: { changes: response } });
                    })
                );
            }, this.concurrentRequests)
        )
    );
    deletePerson$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deletePersonAction),
            mergeMap((action) => {
                return this.service.delete(action.aid, action.id).pipe(
                    map((response) => {
                        console.log('response from query : ', response);
                        return personDeletedAction({ payload: { id: action.id } });
                    })
                );
            }, this.concurrentRequests)
        )
    );                 
}
