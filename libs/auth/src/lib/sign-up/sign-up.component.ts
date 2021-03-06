import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { signupUserAction } from '../+state/auth.actions';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  constructor(public fb: FormBuilder, private store: Store, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSubmit() {
    this.store.dispatch(signupUserAction({ payload: { email: this.form.value.email, password: this.form.value.password } }))
  }
}


