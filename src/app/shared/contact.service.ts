// src/app/shared/contact.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  // The Google Apps Script URL is now managed in one place.
  private readonly WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxYm4n2A4tWSY8joKYc40mabf8FyxAD3YaNy-UGJf6O-CKA5eqhBQIjTiWygrdJ4Mk/exec';

  constructor() { }

  /**
   * Submits form data to the Google Apps Script.
   * @param formData An object containing the form values (e.g., { name: 'John', email: '...', ... }).
   * @returns A Promise that resolves on success and rejects on error.
   */
  async submitForm(formData: { [key: string]: any }): Promise<void> {
    const fd = new FormData();
    // Append all key-value pairs from the formData object
    for (const key in formData) {
      if (Object.prototype.hasOwnProperty.call(formData, key)) {
        fd.append(key, formData[key] || '');
      }
    }

    // The fetch request is now handled centrally.
    await fetch(this.WEB_APP_URL, {
      method: 'POST',
      body: fd,
      mode: 'no-cors' // Use 'no-cors' to avoid preflight issues with simple requests
    });
  }
}