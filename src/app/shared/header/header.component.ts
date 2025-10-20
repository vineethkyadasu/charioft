import { Component, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID
  ) { }

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
    // Only run this code if the app is in the browser
    if (isPlatformBrowser(this.platformId)) {
      // Check if the navbar is expanded (by checking for the 'show' class)
      if (this.navbarNavDropdown.nativeElement.classList.contains('show')) {
        // Programmatically click the toggle button to collapse the menu
        this.navbarToggler.nativeElement.click();
      }
    }
  }
}