import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // 1. IMPORT isPlatformBrowser
import { NgForm } from '@angular/forms';
import * as bootstrap from 'bootstrap';
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
      
      // 2. WRAP browser-specific code in this check
      if (isPlatformBrowser(this.platformId)) {
        const successToastEl = document.getElementById('successToast');
        if (successToastEl) {
          const successToast = new bootstrap.Toast(successToastEl);
          successToast.show();
        }
      }
      
      form.resetForm();
    } catch (err) {
      console.error('Error sending form:', err);
      
      // 2. ALSO WRAP the error toast logic
      if (isPlatformBrowser(this.platformId)) {
        const errorToastEl = document.getElementById('errorToast');
        if (errorToastEl) {
          const errorToast = new bootstrap.Toast(errorToastEl);
          errorToast.show();
        }
      }
      
    } finally {
      this.disableSend = false;
    }
  }
}