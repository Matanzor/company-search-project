import { Component } from '@angular/core';
import { SearchPageComponent } from './search-page/search-page.component';

@Component({
  selector: 'app-root',
  template: '<app-search-page></app-search-page>',
  standalone: true,
  // Import the standalone SearchPageComponent so it can be used in the template
  imports: [SearchPageComponent]
})
export class AppComponent { }
