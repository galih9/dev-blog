import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'classNameToText',
})
export class ClassNameToTextPipe implements PipeTransform {
  transform(
    value: string,
    fromType: 'camelCase' | 'kebabCase' = 'camelCase',
    toType: 'normal' | 'camelCase' = 'normal'
  ): string {
    if (!value) return value;

    let result = value;

    if (fromType === 'camelCase') {
      result = value.replace(/([a-z])([A-Z])/g, '$1 $2');
    } else if (fromType === 'kebabCase') {
      result = value.replace(/-/g, ' ');
    }

    if (toType === 'camelCase') {
      result = result.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
        if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
      });
    } else if (toType === 'normal' && fromType === 'camelCase') {
      result = result.charAt(0).toUpperCase() + result.slice(1);
    }

    return result;
  }
}
