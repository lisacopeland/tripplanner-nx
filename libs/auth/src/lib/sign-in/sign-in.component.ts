import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginAction } from '../+state/auth.actions';
import { selectAuthError } from '../+state/auth.reducers';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  
  form: FormGroup;
  errorMessage: string;
  constructor(public fb: FormBuilder, private store: Store, private router: Router) { }

  ngOnInit(): void {
    this.store.select(selectAuthError).subscribe(error => {
      if (error) {
        this.errorMessage = error;
      }
    });

    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],      
    })    
  }

  onSubmit() {
    this.store.dispatch(loginAction({ payload: { email: this.form.value.email, password: this.form.value.password}}))
  }

}
