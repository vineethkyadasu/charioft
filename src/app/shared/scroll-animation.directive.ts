// src/app/shared/scroll-animation.directive.ts

import { Directive, ElementRef, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appScrollAnimation]'
})
export class ScrollAnimationDirective implements AfterViewInit, OnDestroy {
  private observer: IntersectionObserver | undefined;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object // Inject the platform ID
  ) {}

  ngAfterViewInit(): void {
    // This is the crucial guard. The IntersectionObserver will ONLY be
    // created and used if the code is running in a browser.
    if (isPlatformBrowser(this.platformId)) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            if (this.observer) {
              this.observer.unobserve(entry.target);
            }
          }
        });
      }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
      });

      this.observer.observe(this.el.nativeElement);
    }
  }

  ngOnDestroy(): void {
    // Clean up the observer if it was ever created
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}