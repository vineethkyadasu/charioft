import { Component, OnInit} from '@angular/core';
import { SeoService } from 'src/app/shared/seo.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit{

constructor(private seoService: SeoService) { }

  ngOnInit(): void {
    this.seoService.updateTags(
      'Charioft | About Our Technology & Automation Experts',
      'Learn about Charioft, a specialized team of technology experts delivering secure, scalable, and modern digital systems for enterprise growth.'
    );
    this.seoService.setCanonicalURL('https://charioft.com/about');
    this.seoService.addSchema({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://charioft.com/"
      },{
        "@type": "ListItem",
        "position": 2,
        "name": "About Us",
        "item": "https://charioft.com/about"
      }]
    });
    this.seoService.addBrandSchema();
  }

}