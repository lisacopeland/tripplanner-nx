import { Component, Input } from '@angular/core';
import { Person } from '@tripplanner-nx/people';
import { DEFAULT_AVATAR } from '@tripplanner-nx/common';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
  @Input() person: Person;

  DEFAULT_AVATAR = DEFAULT_AVATAR;

}
