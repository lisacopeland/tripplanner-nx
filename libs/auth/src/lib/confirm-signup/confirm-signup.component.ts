import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { confirmSignupUserAction, signupUserAction } from '../+state/auth.actions';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-confirm-sign-up',
  templateUrl: './confirm-signup.component.html',
  styleUrls: ['./confirm-signup.component.scss']
})
export class ConfirmSignUpComponent implements OnInit {
  form: FormGroup;
  constructor(public fb: FormBuilder, private store: Store, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      confirmationCode: ['', Validators.required],
    })
  }

  onSubmit() {
    this.store.dispatch(confirmSignupUserAction({ payload: { email: this.form.value.email, confirmationCode: this.form.value.confirmationCode } }))
  }
}


