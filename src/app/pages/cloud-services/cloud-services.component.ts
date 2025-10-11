import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/shared/contact.service';
import * as bootstrap from 'bootstrap';
import { NgForm } from '@angular/forms';
import { SeoService } from 'src/app/shared/seo.service';

@Component({
  selector: 'app-cloud-services',
  templateUrl: './cloud-services.component.html',
  styleUrls: ['./cloud-services.component.scss']
})
export class CloudServicesComponent implements OnInit {
  disableSend = false;

  constructor(private contactService: ContactService,private seoService: SeoService,) {}

  ngOnInit(): void {
    this.seoService.updateTags(
      'Exadata Database Support & Services | Charioft',
      'Optimize your Oracle environment with Charioft\'s expert Exadata services. We offer support for cloud, on-premises, and hybrid solutions, including planning, migration, and 24x7 monitoring.'
    );
  }

  async onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.disableSend = true;

    const formData = {
      ...form.value,
      services: 'Exadata Services Inquiry'
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