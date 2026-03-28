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
   * Ensures "Charioft" is the leading word for brand prominence.
   */
  updateTags(title: string, description: string, image: string = 'https://charioft.com/assets/media/home-banner.png'): void {
    const brandTitle = title.includes('Charioft') ? title : `${title} | Charioft`;
    const brandDescription = description.startsWith('Charioft') ? description : `Charioft: ${description}`;

    this.title.setTitle(brandTitle);
    this.meta.updateTag({ name: 'description', content: brandDescription });
    this.meta.updateTag({ name: 'author', content: 'Charioft' });

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: brandTitle });
    this.meta.updateTag({ property: 'og:description', content: brandDescription });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Charioft' });

    // Twitter
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: brandTitle });
    this.meta.updateTag({ name: 'twitter:description', content: brandDescription });
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

  /**
   * Specifically adds brand-linkage schema to help overcome autocorrect.
   */
  addBrandSchema(): void {
    this.addSchema({
      "@context": "https://schema.org",
      "@type": "Brand",
      "name": "Charioft",
      "url": "https://charioft.com",
      "description": "Charioft is a premier technology services and automation platform.",
      "sameAs": [
        "https://www.linkedin.com/company/charioft"
      ]
    });
  }
}