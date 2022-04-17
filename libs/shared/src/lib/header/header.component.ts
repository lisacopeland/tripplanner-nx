import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { logOutUserAction } from '@tripplanner-nx/auth';
import { DEFAULT_AVATAR } from '@tripplanner-nx/common';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() menuOpen: boolean;
  @Output() menuToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  DEFAULT_AVATAR = DEFAULT_AVATAR;
  constructor(private store: Store, private router: Router) { }

  onSignout() {
    this.store.dispatch(logOutUserAction({ payload: {}}));
    this.router.navigate(['/signin']);
  }

}
