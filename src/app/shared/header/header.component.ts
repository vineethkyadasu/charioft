import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  // Get a reference to the navbar collapse element and the toggle button from the HTML
  @ViewChild('navbarNavDropdown') navbarNavDropdown!: ElementRef;
  @ViewChild('navbarToggler') navbarToggler!: ElementRef;

  constructor(private router: Router) { }

  /**
   * Checks if the current URL path starts with '/services'.
   * This is used to apply an active class to the "Services" dropdown link.
   */
  get isServicesActive(): boolean {
    return this.router.url.startsWith('/services');
  }

  /**
   * Closes the mobile navbar collapse menu if it is currently open.
   * This is called when any navigation link is clicked.
   */
  closeNavbar(): void {
    // Check if the navbar is expanded (by checking for the 'show' class)
    if (this.navbarNavDropdown.nativeElement.classList.contains('show')) {
      // Programmatically click the toggle button to collapse the menu
      this.navbarToggler.nativeElement.click();
    }
  }
}