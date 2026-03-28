import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // 1. IMPORT isPlatformBrowser
import { NgForm } from '@angular/forms';
import { ContactService } from 'src/app/shared/contact.service';
import { SeoService } from 'src/app/shared/seo.service';

@Component({
  selector: 'app-managed-services',
  templateUrl: './managed-services.component.html',
  styleUrls: ['./managed-services.component.scss']
})
export class ManagedServicesComponent implements OnInit {
  disableSend = false;

  constructor(
    private contactService: ContactService,
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object // 2. INJECT PLATFORM_ID
  ) {}

  ngOnInit(): void {
    this.seoService.updateTags(
      'Charioft | Proactive Managed IT Services & 24/7 Support',
      'Optimize your IT infrastructure with Charioft\'s managed services. We provide 24/7 monitoring, security, and expert support to ensure peak performance for your enterprise.'
    );
    this.seoService.setCanonicalURL('https://charioft.com/services/managed');
    this.seoService.addSchema({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://charioft.com/"
      },{
        "@type": "ListItem",
        "position": 2,
        "name": "Managed Services",
        "item": "https://charioft.com/services/managed"
      }]
    });
    this.seoService.addBrandSchema();
  }

  async onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.disableSend = true;

    const formData = {
      ...form.value,
      services: 'Managed Services Inquiry'
    };

    try {
      await this.contactService.submitForm(formData);
      
      // 3. WRAP browser-specific code in this check
      if (isPlatformBrowser(this.platformId)) {
       alert('Your message has been sent successfully!');
      }
      
      form.resetForm();
    } catch (err) {
      console.error('Error sending form:', err);
      
      // 3. ALSO WRAP the error toast logic
      if (isPlatformBrowser(this.platformId)) {
        alert('Something went wrong. Please try again.');
      }
      
    } finally {
      this.disableSend = false;
    }
  }
}