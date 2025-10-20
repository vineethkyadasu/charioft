import { Component, HostListener, ElementRef, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ContactService } from '../../shared/contact.service';
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
    { name: 'High Availability Solutions Inquiry', selected: false },
    { name: 'Managed Services Inquiry', selected: false },
    { name: 'Automation Services Inquiry', selected: false },
    { name: 'Other', selected: false }
  ];

  constructor(
    private el: ElementRef,
    private contactService: ContactService,
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object
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

    try {
      await this.contactService.submitForm(formData);
      
      if (isPlatformBrowser(this.platformId)) {
      alert('Your message has been sent successfully!');
      }
      
      form.resetForm();
      this.serviceOptions.forEach(opt => opt.selected = false);

    } catch (err) {
      console.error('Error sending form:', err);

      if (isPlatformBrowser(this.platformId)) {
      alert('Something went wrong. Please try again.');
      }

    } finally {
      this.disableSend = false;
    }
  }

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
    // ** THIS IS THE FIX **
    // Only run this logic if we are in a browser environment.
    if (isPlatformBrowser(this.platformId)) {
      if (!this.el.nativeElement.contains(event.target)) {
        this.isDropdownOpen = false;
      }
    }
  }
}