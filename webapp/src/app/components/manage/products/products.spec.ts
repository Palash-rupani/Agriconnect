import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsComponent] // ✅ use ProductsComponent
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent); // ✅ use ProductsComponent
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
