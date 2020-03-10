import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): string {
    const birthDate: moment.Moment = moment(value);
    const today: moment.Moment = moment();

    const diff: number = today.diff(birthDate, 'years');

    return `${diff} ans`;
  }

}
