import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { createTripAction, updateTripAction } from '@tripplanner-nx/trips';
import { Trip } from '../trips.model';

@Component({
  selector: 'app-trip-edit',
  templateUrl: './trip-edit.component.html',
  styleUrls: ['./trip-edit.component.scss']
})
export class TripEditComponent implements OnInit {

  form: FormGroup;
  trip: Trip;

  constructor(public fb: FormBuilder,
    public dialogRef: MatDialogRef<TripEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Trip,
    private store: Store) { }

  ngOnInit(): void {
    this.trip = this.data;
    this.form = this.fb.group({
      admin_title: [this.trip.admin_title, Validators.required],
      admin_notes: [this.trip.admin_notes],
      start_date: [this.trip.start_date, Validators.required],
      end_date: [this.trip.end_date, Validators.required],
      // participants: [this.trip.participants]
    })
  }

  onSubmit() {
    const newTrip = new Trip({
      ...this.trip,
      ...this.form.value
    })
    if (this.trip.id) {
      this.store.dispatch(updateTripAction({ id: this.trip.id, changes: newTrip }));
    } else {
      this.store.dispatch(createTripAction({ payload: newTrip }));
    }
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }
}
