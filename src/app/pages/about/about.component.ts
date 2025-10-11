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
      'About Charioft | Technology Experts',
      'Learn about Charioft, a team of database and Engineered System technology experts providing services and support to help you get the most out of your data.'
    );
  }

}