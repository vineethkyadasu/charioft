import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactService } from 'src/app/shared/contact.service';
import * as bootstrap from 'bootstrap';
import { SeoService } from 'src/app/shared/seo.service';

@Component({
  selector: 'app-data-services',
  templateUrl: './data-services.component.html',
  styleUrls: ['./data-services.component.scss']
})
export class DataServicesComponent implements OnInit {
 disableSend = false;

  constructor(private contactService: ContactService, private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateTags(
      'Database Administration (DBA) Services | Charioft',
      'Ensure the performance, reliability, and security of your data with Charioft\'s expert Database Administration (DBA) Services. We offer 24/7 monitoring, performance tuning, and strategic support. Get a consultation today.'
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
