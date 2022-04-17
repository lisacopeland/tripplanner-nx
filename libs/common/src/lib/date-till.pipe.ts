import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

// Takes a string in the format of "2014-09-08T08:02:17-05:00" 
// and transforms it into the fromNow value from Moment
// Extend this so the user can choose the granularity of time 
@Pipe({ name: 'timetill' })
export class DateTillPipe implements PipeTransform {
    transform(s: string): string {
        const momentDate = moment(s);
        const now = moment();
        if (now.isBefore(momentDate, 'day')) {
            // Date is in the future
            return momentDate.from(now);
        } else {
            return momentDate.fromNow();
        }
    }
}