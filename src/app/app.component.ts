import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'charioft';

   phone = "+1 929-445-0466"
  defaultMessage: string = "Greetings, I have visited your website and would like to know more about your services.";
  whatsappLink: string = "";

  ngOnInit(): void {
    const encodedMsg = encodeURIComponent(this.defaultMessage);
    // ✅ Detect mobile
  const isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  if (isMobile) {
    // Open WhatsApp app
    this.whatsappLink = `https://wa.me/${this.phone}?text=${encodedMsg}`;
  } else {
    // Open WhatsApp Web
    this.whatsappLink = `https://web.whatsapp.com/send?phone=${this.phone}&text=${encodedMsg}`;
  }
  }
}
