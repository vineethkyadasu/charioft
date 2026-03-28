import { Component, OnInit} from '@angular/core';
import { SeoService } from 'src/app/shared/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
constructor(private seoService: SeoService) { }

  ngOnInit(): void {
    this.seoService.updateTags(
      'Charioft | Technology Services & Automation Platform',
      'Charioft is a premier technology services and automation platform. We deliver business resilience and reliability through expert database, engineered systems, and cloud infrastructure services.'
    );
    this.seoService.setCanonicalURL('https://charioft.com/');
    this.seoService.addBrandSchema();
  }
}