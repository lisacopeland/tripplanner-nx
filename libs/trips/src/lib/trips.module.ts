import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@tripplanner-nx/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TripDetailsEffects } from './+state/tripdetails.effects';
import { tripDetailsReducer } from './+state/tripdetails.reducers';
import { TripsEffects } from './+state/trips.effects';
import { tripsReducer } from './+state/trips.reducers';
import { TripEditComponent } from './trip-edit/trip-edit.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ClipboardModule,
    MaterialModule,
    StoreModule.forFeature('trips', tripsReducer),
    StoreModule.forFeature('tripdetails', tripDetailsReducer),
    EffectsModule.forFeature([TripsEffects]),
    EffectsModule.forFeature([TripDetailsEffects])
  ],
  declarations: [
    TripEditComponent,
  ],
  exports: [
    TripEditComponent,
  ],
  providers: []  
})
export class TripsModule {}
