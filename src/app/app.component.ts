import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'charioft';
  phone = "+1 929-445-0466";
  defaultMessage: string = "Greetings, I have visited your website and would like to know more about your services.";
  whatsappLink: string = "";

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    // This is the crucial check. The code inside this block will ONLY run
    // when the application is in a browser environment.
    if (isPlatformBrowser(this.platformId)) {
      
      // 1. Dynamically import Bootstrap's JavaScript
      import('bootstrap');

      // 2. Safely run your WhatsApp link logic
      const encodedMsg = encodeURIComponent(this.defaultMessage);
      const isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

      if (isMobile) {
        this.whatsappLink = `https://wa.me/${this.phone}?text=${encodedMsg}`;
      } else {
        this.whatsappLink = `https://web.whatsapp.com/send?phone=${this.phone}&text=${encodedMsg}`;
      }
    }
  }
}