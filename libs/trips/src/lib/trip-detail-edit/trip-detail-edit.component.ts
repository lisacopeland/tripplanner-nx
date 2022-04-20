import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { createTripDetailAction, updateTripDetailAction } from '../+state/tripdetails.actions';
import { TripCostType, TripDetail, TripDetailType } from '../trip-details.model';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-trip-detail-edit',
  templateUrl: './trip-detail-edit.component.html',
  styleUrls: ['./trip-detail-edit.component.scss']
})
export class TripDetailEditComponent implements OnInit {

  form: FormGroup;
  tripDetail: TripDetail;
  elementTypeValues = Object.values(TripDetailType).filter(value => typeof value === 'string');
  costTypeValues = Object.values(TripCostType).filter(value => typeof value === 'string');
  constructor(public fb: FormBuilder,
    public dialogRef: MatDialogRef<TripDetailEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TripDetail,
    private store: Store) { }

  ngOnInit(): void {
    this.tripDetail = this.data;
    this.form = this.fb.group({
      admin_title: [this.tripDetail.admin_title, Validators.required],
      // admin_notes: [this.tripDetail.admin_notes],
      start_date: [this.tripDetail.start_date, Validators.required],
      end_date: [this.tripDetail.end_date, Validators.required],
      location_start: [this.tripDetail.location_start, Validators.required],
      location_end: [this.tripDetail.location_end, Validators.required],
      elementType: [this.tripDetail.elementType, Validators.required],
      costType: [this.tripDetail.costType],
      cost: [this.tripDetail.cost]
      // participants: [this.tripDetail.participants]
    })
  }

  onSubmit() {
    const newTripDetail = new TripDetail({
      ...this.tripDetail,
      ...this.form.value
    })
    if (this.tripDetail.id) {
      this.store.dispatch(updateTripDetailAction({ id: this.tripDetail.id, changes: newTripDetail }));
    } else {
      this.store.dispatch(createTripDetailAction({ payload: newTripDetail }));
    }
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }
}
