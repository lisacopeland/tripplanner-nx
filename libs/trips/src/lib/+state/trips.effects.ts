import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map } from "rxjs";
import { TripService } from "@tripplanner-nx/trips";

import { createTripAction, deleteTripAction, loadTripsAction, setTripsAction, tripCreatedAction, tripDeletedAction, tripUpdatedAction, updateTripAction } from "./trips.actions";

@Injectable()
export class TripsEffects {
    concurrentRequests = 5;

    constructor(
        public service: TripService,
        public actions$: Actions
    ) { }

    loadTrips$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadTripsAction),
            mergeMap((action) => {
                return this.service.query(action.search.account_id, action.search).pipe(
                    map((response) => {
                        console.log('response from query : ', response);
                        return setTripsAction({ payload: response });
                    })
                );
            }, this.concurrentRequests)
        )
    );

    createTrip$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createTripAction),
            mergeMap((action) => {
                return this.service.create(action.payload).pipe(
                    map((response) => {
                        console.log('response from query : ', response);
                        return tripCreatedAction({ payload: { trip: response }});
                    })
                );
            }, this.concurrentRequests)
        )
    );
    updateTrip$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateTripAction),
            mergeMap((action) => {
                return this.service.update(action.changes).pipe(
                    map((response) => {
                        console.log('response from query : ', response);
                        return tripUpdatedAction({ payload: { changes: response } });
                    })
                );
            }, this.concurrentRequests)
        )
    );
    deleteTrip$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteTripAction),
            mergeMap((action) => {
                return this.service.delete(action.aid, action.id).pipe(
                    map((response) => {
                        console.log('response from query : ', response);
                        return tripDeletedAction({ payload: { id: action.id } });
                    })
                );
            }, this.concurrentRequests)
        )
    );                 
}
