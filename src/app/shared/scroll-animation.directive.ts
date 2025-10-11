// src/app/shared/scroll-animation.directive.ts
import { Directive, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appScrollAnimation]' // This is how you'll use it in HTML: <div appScrollAnimation>
})
export class ScrollAnimationDirective implements AfterViewInit, OnDestroy {
  private observer: IntersectionObserver | undefined;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          if (this.observer) {
            this.observer.unobserve(entry.target); // Stop observing once it's visible
          }
        }
      });
    }, {
      threshold: 0.2 // Trigger when 10% of the element is visible
    });

    this.observer.observe(this.el.nativeElement); // Observe the element this directive is on
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect(); // Clean up the observer when the component is destroyed
    }
  }
}