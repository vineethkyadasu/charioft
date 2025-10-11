// src/app/contact-us/contact-us.component.ts
import { Component, HostListener, ElementRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactService } from '../../shared/contact.service'; // Adjust path if needed
import * as bootstrap from 'bootstrap';
import { SeoService } from 'src/app/shared/seo.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  disableSend = false;
  isDropdownOpen = false;
  serviceOptions = [
    { name: 'Exadata Services Inquiry', selected: false },
    { name: 'Database Services Inquiry', selected: false },
    { name: 'HA and Cloud Backup Inquiry', selected: false },
    { name: 'Managed Services Inquiry', selected: false },
    { name: 'Automation Services Inquiry', selected: false },
    { name: 'Other', selected: false }
  ];

  constructor(
    private el: ElementRef,
    private contactService: ContactService,
    private seoService: SeoService
  ) {}

   ngOnInit(): void {
    this.seoService.updateTags(
      'Contact Us | Charioft - Let\'s Build Something Great',
      'Get in touch with the Charioft team. Whether you have a project idea, a question about our technology services, or a partnership inquiry, we are ready to help. Contact us today!'
    );
  }

  async onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.disableSend = true;

    const selectedServices = this.serviceOptions
      .filter(opt => opt.selected)
      .map(opt => opt.name)
      .join(', ');

    const formData = {
      ...form.value,
      services: selectedServices
    };

    console.log(formData)

    try {
      await this.contactService.submitForm(formData);
      
      // **FIX 1: Add null check before creating toast**
      const successToastEl = document.getElementById('successToast');
      if (successToastEl) {
        const successToast = new bootstrap.Toast(successToastEl);
        successToast.show();
      }
      
      form.resetForm();
      this.serviceOptions.forEach(opt => opt.selected = false);

    } catch (err) {
      console.error('Error sending form:', err);

      // **FIX 1: Add null check before creating toast**
      const errorToastEl = document.getElementById('errorToast');
      if (errorToastEl) {
        const errorToast = new bootstrap.Toast(errorToastEl);
        errorToast.show();
      }

    } finally {
      this.disableSend = false;
    }
  }

  // **FIX 2: Implemented the missing logic for the custom multiselect**
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  get selectedOptionsText(): string {
    const selected = this.serviceOptions.filter(opt => opt.selected);
    if (selected.length === 0) {
      return 'Select services...';
    }
    if (selected.length === 1) {
      return selected[0].name;
    }
    return `${selected.length} services selected`;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event): void {
    if (!this.el.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }
}