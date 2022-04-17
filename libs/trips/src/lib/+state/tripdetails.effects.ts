import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map } from "rxjs";

import { TripDetailsService, createTripDetailAction, deleteTripDetailAction, loadTripDetailsAction, 
         setTripDetailsAction, tripDetailCreatedAction, tripDetailDeletedAction, 
         tripDetailUpdatedAction, updateTripDetailAction } from "@tripplanner-nx/trips";

@Injectable()
export class TripDetailsEffects {
    concurrentRequests = 5;

    constructor(
        public service: TripDetailsService,
        public actions$: Actions
    ) { }

    loadTripDetails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadTripDetailsAction),
            mergeMap((action) => {
                return this.service.query(action.search.account_id, action.search.tripId, action.search).pipe(
                    map((response) => {
                        console.log('response from query : ', response);
                        return setTripDetailsAction({ payload: response });
                    })
                );
            }, this.concurrentRequests)
        )
    );

    createTripDetail$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createTripDetailAction),
            mergeMap((action) => {
                return this.service.create(action.payload.account_id, action.payload.tripId, action.payload).pipe(
                    map((response) => {
                        console.log('response from query : ', response);
                        return tripDetailCreatedAction({ payload: { TripDetail: response }});
                    })
                );
            }, this.concurrentRequests)
        )
    );
    updateTripDetail$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateTripDetailAction),
            mergeMap((action) => {
                return this.service.update(action.changes.account_id, action.changes.tripId, action.changes).pipe(
                    map((response) => {
                        console.log('response from query : ', response);
                        return tripDetailUpdatedAction({ payload: { changes: response } });
                    })
                );
            }, this.concurrentRequests)
        )
    );
    deleteTripDetail$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteTripDetailAction),
            mergeMap((action) => {
                return this.service.delete(action.aid, action.tripId, action.id).pipe(
                    map((response) => {
                        console.log('response from query : ', response);
                        return tripDetailDeletedAction({ payload: { id: action.id } });
                    })
                );
            }, this.concurrentRequests)
        )
    );                 
}
