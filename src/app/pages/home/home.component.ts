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
      'Charioft | Innovative Technology Service Platform',
      'Charioft delivers operational excellence through resilient and reliable technology solutions, including Exadata, Database Services, and Cloud Backup.'
    );
  }
}