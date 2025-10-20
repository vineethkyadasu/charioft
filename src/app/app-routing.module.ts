import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CloudServicesComponent } from './pages/cloud-services/cloud-services.component';
import { DataServicesComponent } from './pages/data-services/data-services.component';
import { AutomationServicesComponent } from './pages/automation-services/automation-services.component';
import { ManagedServicesComponent } from './pages/managed-services/managed-services.component';
import { ProductPlatformServicesComponent } from './pages/product-platform-services/product-platform-services.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'exadata', component: CloudServicesComponent },
  { path: 'database', component: DataServicesComponent },
  { path: 'services/automation', component: AutomationServicesComponent },
  { path: 'services/managed', component: ManagedServicesComponent },
  { path: 'services/hacloud', component: ProductPlatformServicesComponent },
  { path: 'contact', component: ContactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', initialNavigation: 'enabledBlocking' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
