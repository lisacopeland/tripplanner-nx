import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ConfirmSignUpComponent } from './confirm-signup/confirm-signup.component';
import { MaterialModule } from '@tripplanner-nx/common';
import { SharedModule } from '@tripplanner-nx/shared';
import { ReactiveFormsModule } from '@angular/forms';
import { authReducer } from './+state/auth.reducers';
import { AuthEffects } from './+state/auth.effects';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects])    
  ],
  declarations: [
    SignInComponent,
    SignUpComponent,
    ConfirmSignUpComponent
  ],
  providers: [],
  exports: [
    SignInComponent,
    SignUpComponent,
    ConfirmSignUpComponent
  ]  
})
export class AuthModule {}
