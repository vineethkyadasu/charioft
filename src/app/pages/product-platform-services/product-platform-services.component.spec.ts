import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPlatformServicesComponent } from './product-platform-services.component';

describe('ProductPlatformServicesComponent', () => {
  let component: ProductPlatformServicesComponent;
  let fixture: ComponentFixture<ProductPlatformServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPlatformServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPlatformServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
