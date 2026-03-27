// src/app/shared/seo.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  /**
   * Updates the core SEO meta tags.
   */
  updateTags(title: string, description: string, image: string = 'https://charioft.com/assets/media/home-banner.png'): void {
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'author', content: 'Charioft' });

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:type', content: 'website' });

    // Twitter
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: image });
  }

  /**
   * Sets the canonical URL for the current page.
   */
  setCanonicalURL(url: string): void {
    const head = this.document.getElementsByTagName('head')[0];
    let element: HTMLLinkElement | null = this.document.querySelector(`link[rel='canonical']`);
    if (element === null) {
      element = this.document.createElement('link');
      element.setAttribute('rel', 'canonical');
      head.appendChild(element);
    }
    element.setAttribute('href', url);
  }

  /**
   * Sets the robots meta tag (index/noindex, follow/nofollow).
   */
  setIndex(allow: boolean = true): void {
    this.meta.updateTag({ name: 'robots', content: allow ? 'index, follow' : 'noindex, nofollow' });
  }

  /**
   * Injects JSON-LD structured data into the head of the document.
   */
  addSchema(schema: any): void {
    const head = this.document.getElementsByTagName('head')[0];
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    head.appendChild(script);
  }
}