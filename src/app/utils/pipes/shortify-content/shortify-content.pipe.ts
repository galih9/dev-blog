import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortifyContent',
  pure: true, // Important: Make it pure for performance
})
export class ShortifyContentPipe implements PipeTransform {
  transform(markdown: string | null | undefined): string {
    if (!markdown) {
      return '';
    }

    const lines = markdown.split('\n');
    let descriptionLines: string[] = [];

    for (const line of lines) {
      if (!line.trim().startsWith('#')) { // Exclude lines starting with '#' (headers)
        descriptionLines.push(line);
      }
      if (descriptionLines.length >= 3) {
        break; // Stop after 3 description lines
      }
    }

    return descriptionLines.join('\n'); // Join the selected lines back into a string
  }
}