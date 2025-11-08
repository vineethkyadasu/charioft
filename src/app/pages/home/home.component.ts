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
      'Charioft | Technology Service Platform for Business Resilience',
      'Achieve operational excellence with Charioft, a leading technology service platform. We deliver resilience, reliability, and uninterrupted performance through expert database, engineered systems, and infrastructure services.'
    );
  }
}