import { Component, OnInit} from '@angular/core';
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

  constructor(private contactService: ContactService,private seoService: SeoService,) {}

ngOnInit(): void {
    this.seoService.updateTags(
      'Automation Services | Business Process Improvement (BPI) | Charioft',
      'Enhance business efficiency and reduce costs with Charioft\'s expert Automation Services. We specialize in Business Process Improvement (BPI) to streamline workflows, boost productivity, and increase your ROI. Schedule your assessment today.'
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