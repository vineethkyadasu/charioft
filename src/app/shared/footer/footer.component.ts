import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
year = new Date().getFullYear()
// Inject the Router in the constructor
  constructor(private router: Router) {}

  /**
   * A getter that checks if the current route is '/about'.
   * @returns {boolean} - True if the current page is the About page, otherwise false.
   */
  get showDesignerLink(): boolean {
    return this.router.url === '/about'
  }
}
