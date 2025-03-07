import { Component, ViewEncapsulation } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-no-tailwind',
  template: `
    <div class="my-custom-class">
      This component has no Tailwind.

      <markdown class="prose" ngPreserveWhitespaces
        ># Title &#x0a; ## Subtitle</markdown
      >
    </div>
  `,
  styles: [
    `
      .my-custom-class {
        color: blue;
        font-size: 16px;
      }
    `,
  ],
  imports: [MarkdownModule],
  encapsulation: ViewEncapsulation.None, // Disable encapsulation
})
export class NoTailwindComponent {}
