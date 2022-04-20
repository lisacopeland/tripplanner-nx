import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, filter } from 'rxjs';
import { Trip, selectCurrentTrip, TripDetail, TripEditComponent, TripDetailEditComponent, TRIP_STATUS_NEW, selectAllTripDetails } from '@tripplanner-nx/trips';
import { DEFAULT_BACKGROUND } from '@tripplanner-nx/common';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss']
})
export class TripDetailComponent implements OnInit {
  selectedItem: TripDetail;
  trip$: Observable<Trip> = this.store.pipe(
    select(selectCurrentTrip),
    filter((trip) => !!trip)
  );

  tripDetails$: Observable<TripDetail[]> = this.store.pipe(
    select(selectAllTripDetails),
    filter((tripDetails) => !!tripDetails)
  );

  DEFAULT_BACKGROUND = DEFAULT_BACKGROUND;
  menuOpened = false;

  constructor(private router: Router, private store: Store, public dialog: MatDialog) { }


  ngOnInit(): void {
    console.log('Hi from ngOnInit');
  }
  onCreateItem(trip: Trip) {
    this.selectedItem = new TripDetail({
      admin_title: '',
      admin_status: TRIP_STATUS_NEW,
      tripId: trip.id,
      account_id: trip.account_id
    })
    this.onEditItem();
  }

  onEditItem() {
    const dialogRef = this.dialog.open(TripDetailEditComponent, {
      width: '400px',
      data: this.selectedItem
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  onEditTrip(trip: Trip) {
    const dialogRef = this.dialog.open(TripEditComponent, {
      width: '400px',
      data: trip
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
}
