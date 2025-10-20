import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // 1. IMPORT isPlatformBrowser
import { NgForm } from '@angular/forms';
import { ContactService } from 'src/app/shared/contact.service';
import { SeoService } from 'src/app/shared/seo.service';

@Component({
  selector: 'app-data-services',
  templateUrl: './data-services.component.html',
  styleUrls: ['./data-services.component.scss']
})
export class DataServicesComponent implements OnInit {
  disableSend = false;

  constructor(
    private contactService: ContactService,
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object // 2. INJECT PLATFORM_ID
  ) {}

  ngOnInit(): void {
    this.seoService.updateTags(
      'Database Administration (DBA) Services | Charioft',
      'Ensure the performance, reliability, and security of your data with Charioft\'s expert Database Administration (DBA) Services. We offer tiered support, top-quality experts, and 24/7 monitoring to maximize your data\'s value. Get a consultation today.'
    );
  }

  async onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.disableSend = true;

    const formData = {
      ...form.value,
      services: 'Database Services Inquiry'
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