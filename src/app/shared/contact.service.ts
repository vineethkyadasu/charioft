// src/app/shared/contact.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  // The Google Apps Script URL is now managed in one place.
  private readonly WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzrkPXbqZ9-p7Yr3igdClGyDsRlVznPtD29OTFG4_LPuCkM8QGnki_Pjk26mpE8pV9htg/exec';

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