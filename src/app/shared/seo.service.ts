// src/app/shared/seo.service.ts
import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private title: Title, private meta: Meta) { }

  /**
   * Updates the SEO meta tags for the current page.
   * @param title The new title for the page.
   * @param description The new meta description for the page.
   */
  updateTags(title: string, description: string): void {
    // Set the page title
    this.title.setTitle(title);

    // Update or add the meta description tag
    this.meta.updateTag({ name: 'description', content: description });

    // You can add more tags here, like keywords or Open Graph tags for social media
    this.meta.updateTag({ name: 'author', content: 'Charioft' });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    // Add an Open Graph image tag if you have a default image
    // this.meta.updateTag({ property: 'og:image', content: 'your-image-url.jpg' });
  }
}