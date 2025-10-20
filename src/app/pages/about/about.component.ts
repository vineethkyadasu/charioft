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
      'About Charioft | Database & Engineered System Experts',
      'Learn about Charioft, a team of expert database and Engineered System technology specialists. We provide services and support to help you manage, collect, and derive value from your organizational data through our reliable, software-driven platform.'
    );
  }

}