import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ContactService } from 'src/app/shared/contact.service';
import { SeoService } from 'src/app/shared/seo.service';

@Component({
  selector: 'app-automation-services',
  templateUrl: './automation-services.component.html',
  styleUrls: ['./automation-services.component.scss']
})
export class AutomationServicesComponent implements OnInit {
  disableSend = false;

  constructor(
    private contactService: ContactService,
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.seoService.updateTags(
      'Automation & Business Process Improvement (BPI) | Charioft',
      'Streamline operations and increase ROI with Charioft\'s expert Business Process Improvement (BPI) and Automation (BPA) services. We help you reduce costs, boost agility, and align technology with your business goals.'
    );
  }

  async onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.disableSend = true;

    const formData = {
      ...form.value,
      services: 'Automation Services Inquiry'
    };

    try {
      await this.contactService.submitForm(formData);
      
      // ** REPLACED TOAST WITH ALERT **
      // Use a simple alert, but keep it inside the isPlatformBrowser check
      if (isPlatformBrowser(this.platformId)) {
        alert('Your message has been sent successfully!');
      }
      
      form.resetForm();
    } catch (err) {
      console.error('Error sending form:', err);
      
      // ** REPLACED TOAST WITH ALERT **
      if (isPlatformBrowser(this.platformId)) {
        alert('Something went wrong. Please try again.');
      }
      
    } finally {
      this.disableSend = false;
    }
  }
}