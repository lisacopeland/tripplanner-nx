import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTillPipe } from './date-till.pipe';

@NgModule({
  declarations: [
    DateTillPipe
  ],
  imports: [CommonModule],
  exports: [DateTillPipe]
})
export class TripPlannerCommonModule {}
