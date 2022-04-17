import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripListComponent } from './trip-list/trip-list.component';
import { TripDetailComponent } from './trip-detail/trip-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { SigninPageComponent } from './signin-page/signin-page.component';
import {
  API_URL,
  COGNITO_APP_CLIENT_ID,
  COGNITO_USER_POOL_ID,
  MaterialModule,
} from '@tripplanner-nx/common';
import { SharedModule } from '@tripplanner-nx/shared';
import { TripPlannerCommonModule } from '@tripplanner-nx/common';
import { environment } from '../environments/environment';
import { TripsModule } from '@tripplanner-nx/trips';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './+state/app.reducers';
import { AppEffects } from './+state/app.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthModule } from '@tripplanner-nx/auth';
import { PeopleModule } from '@tripplanner-nx/people';
import { ConfirmSignupPageComponent } from './confirm-signup-page/confirm-signup-page.component';

@NgModule({
  declarations: [
    AppComponent,
    TripListComponent,
    TripDetailComponent,
    SignupPageComponent,
    SigninPageComponent,
    ConfirmSignupPageComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    SharedModule,
    PeopleModule,
    TripsModule,
    TripPlannerCommonModule,
    MaterialModule,
    StoreModule.forRoot(appReducers, {
      metaReducers: !environment.production ? [] : [],
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    EffectsModule.forRoot([AppEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [
    { provide: API_URL, useValue: environment.apiUrl },
    { provide: COGNITO_USER_POOL_ID, useValue: environment.cognitoUserPoolId },
    {
      provide: COGNITO_APP_CLIENT_ID,
      useValue: environment.cognitoAppClientId,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
