import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@tripplanner-nx/common';
import { AvatarComponent } from './avatar/avatar.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    AvatarComponent,
    HeaderComponent
  ],
  providers: [],
  exports: [
    AvatarComponent,
    HeaderComponent
  ]
})
export class SharedModule {}
