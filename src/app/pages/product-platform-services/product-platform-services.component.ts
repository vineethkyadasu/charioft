import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { ContactService } from 'src/app/shared/contact.service';
import { SeoService } from 'src/app/shared/seo.service';

@Component({
  selector: 'app-product-platform-services',
  templateUrl: './product-platform-services.component.html',
  styleUrls: ['./product-platform-services.component.scss']
})
export class ProductPlatformServicesComponent implements OnInit {
 disableSend = false;

  constructor(private contactService: ContactService, private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateTags(
      'High Availability Services | OCI Security | Charioft',
      'Ensure business continuity with Charioft\'s expert High Availability services. We specialize in Oracle Cloud Infrastructure (OCI) security, offering threat management, 24/7 monitoring, and secure design to protect your databases, apps, and networks.'
    );
  }
  
  async onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.disableSend = true;

    const formData = {
      ...form.value,
      services: 'High Availability Services Inquiry'
    };

    try {
      await this.contactService.submitForm(formData);
      
      // **THE FIX:** Check if the element exists before using it.
      const successToastEl = document.getElementById('successToast');
      if (successToastEl) {
        const successToast = new bootstrap.Toast(successToastEl);
        successToast.show();
      }
      
      form.resetForm();
    } catch (err) {
      console.error('Error sending form:', err);
      
      // **THE FIX:** Also check for the error toast element.
      const errorToastEl = document.getElementById('errorToast');
      if (errorToastEl) {
        const errorToast = new bootstrap.Toast(errorToastEl);
        errorToast.show();
      }
      
    } finally {
      this.disableSend = false;
    }
  }
}
