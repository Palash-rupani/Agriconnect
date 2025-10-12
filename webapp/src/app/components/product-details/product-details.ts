import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../../services/customer';
import { Product } from '../../types/product';

@Component({
  selector: 'app-product-details',
  standalone: true,
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.scss']
})
export class ProductDetails implements OnInit {

  private customerService = inject(Customer);
  private route = inject(ActivatedRoute);

  product!: Product; // will be set after fetch

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.customerService.getProductById(id).subscribe({
        next: (res: Product) => {
          this.product = res;
          console.log('✅ Product fetched:', this.product);
        },
        error: (err) => {
          console.error('❌ Error fetching product:', err);
        }
      });
    } else {
      console.warn('⚠️ No product ID found in route.');
    }
  }
  currentImageIndex = 0;

nextImage() {
  if (this.product && this.product.images) {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.product.images.length;
  }
}

prevImage() {
  if (this.product && this.product.images) {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.product.images.length) % this.product.images.length;
  }
}

}
