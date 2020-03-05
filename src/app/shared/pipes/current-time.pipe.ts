import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'currentTime'
})
export class CurrentTimePipe implements PipeTransform {

  private static readonly API:string = 'http://worldclockapi.com/api/json/utc/now';

  constructor (private httpClient: HttpClient, private translateService: TranslateService) {}

  transform(value: any, ...args: any[]): Promise<string> {
    return new Promise<string>( (resolve) => {
      let transformValue: string;

      this.httpClient.get<any>(CurrentTimePipe.API)
        .pipe( take(1) )
        .subscribe( (utcDateTime:any) => {
          const now: moment.Moment= moment(utcDateTime.currentDateTime);
          const elapsedTime: number = parseInt(now.format('YYYY')) - value;

          if (elapsedTime <= 1) {
            transformValue = this.translateService.instant('movieYear.one');
          } else if (elapsedTime == 2) {
            transformValue = this.translateService.instant('movieYear.two');
          } else if (elapsedTime <= 5) {
            transformValue = this.translateService.instant('movieYear.threeFive');
          } else {
            transformValue = this.translateService.instant('movieYear.moreFive');
          }

          resolve(`Sorti il y a ${transformValue}.`)
        });

    });
  }

}
