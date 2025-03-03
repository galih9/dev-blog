import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: string, initialFormat?: string, resultFormat: string = 'DD MMM YYYY'): string {
    if (!value) return '';
    
    let date = initialFormat ? dayjs(value, initialFormat) : dayjs(value);

    if (!date.isValid()) {
      return 'Invalid Date';
    }

    return date.format(resultFormat);
  }
}
