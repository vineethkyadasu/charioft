import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // 1. IMPORT isPlatformBrowser
import { NgForm } from '@angular/forms';
import * as bootstrap from 'bootstrap';
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
      'Proactive Managed Services | 24/7 IT Support | Charioft',
      'Focus on your core business with Charioft\'s proactive managed services. We ensure peak performance, security, and reliability for your IT infrastructure with 24/7 monitoring and expert support.'
    );
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
        const successToastEl = document.getElementById('successToast');
        if (successToastEl) {
          const successToast = new bootstrap.Toast(successToastEl);
          successToast.show();
        }
      }
      
      form.resetForm();
    } catch (err) {
      console.error('Error sending form:', err);
      
      // 3. ALSO WRAP the error toast logic
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