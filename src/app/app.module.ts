import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CloudServicesComponent } from './pages/cloud-services/cloud-services.component';
import { AutomationServicesComponent } from './pages/automation-services/automation-services.component';
import { DataServicesComponent } from './pages/data-services/data-services.component';
import { ManagedServicesComponent } from './pages/managed-services/managed-services.component';
import { ProductPlatformServicesComponent } from './pages/product-platform-services/product-platform-services.component';
import { ScrollAnimationDirective } from './shared/scroll-animation.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    CloudServicesComponent,
    AutomationServicesComponent,
    DataServicesComponent,
    ManagedServicesComponent,
    ProductPlatformServicesComponent,
    ScrollAnimationDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
