import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { Observable, filter, combineLatest, map } from 'rxjs';
import { setCurrentTripAction, updateTripAction } from '@tripplanner-nx/trips';
import { selectTripsAndPeopleLoaded, selectTripsWithParticipants, TripWithParticipants } from '@tripplanner-nx/trips';
import { DEFAULT_BACKGROUND } from '@tripplanner-nx/common';
import { Trip, TRIP_STATUS_ARCHIVED, TRIP_STATUS_NEW } from '@tripplanner-nx/trips';
import { TripEditComponent } from '@tripplanner-nx/trips';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent {

  constructor(private router: Router, private store: Store, public dialog: MatDialog) { }

  ready$ = this.store.select(selectTripsAndPeopleLoaded);
  tripsWithParticipants$: Observable<TripWithParticipants[]> = this.store.pipe(
    select(selectTripsWithParticipants),
    filter((trips) => !!trips && trips.length > 0)
  );

  vm$ = combineLatest([this.ready$, this.tripsWithParticipants$]).pipe(
    map(([ready, trips]) => ({ ready, trips }))
  );

  newTripTitle = 'New trip';
  aid = 'lisa';
  selectedTrip: Trip;
  showArchived = false;
  archiveToggleLabel = 'Show archived';
  TRIP_STATUS_NEW = TRIP_STATUS_NEW;
  TRIP_STATUS_ARCHIVED = TRIP_STATUS_ARCHIVED;
  DEFAULT_BACKGROUND = DEFAULT_BACKGROUND;

  onGotoDetail(trip: Trip) {
    this.store.dispatch(setCurrentTripAction({ id: trip.id }));
    this.router.navigate(['/tripdetail']);
  }

  createTrip() {
    this.selectedTrip = new Trip({
        admin_title: this.newTripTitle,
        admin_status: TRIP_STATUS_NEW,
        account_id: this.aid
      })
    this.onEdit();
  }

  onEdit() {
    const dialogRef = this.dialog.open(TripEditComponent, {
      width: '400px',
      data: this.selectedTrip
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.newTripTitle = '';
    });
  }

  onArchive() {
    this.selectedTrip.admin_status = 'archived';
    this.store.dispatch(updateTripAction({ id: this.selectedTrip.id, changes: this.selectedTrip }));
  }

  archiveToggle() {
    this.showArchived = !this.showArchived;
    this.archiveToggleLabel = (this.showArchived) ? 'Hide archived' : 'Show archived';
  }

}
