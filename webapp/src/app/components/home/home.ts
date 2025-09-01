import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { Customer } from '../../services/customer';
import { Product } from '../../types/product';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  customer = inject(Customer);
  newProducts: Product[] = [];
  featuredProducts: Product[] = [];

  currentIndexMap: { [productId: string]: number } = {};
  intervalRefs: { [productId: string]: any } = {}; // keep track so we don’t duplicate timers

  ngOnInit() {
    this.customer.getNewProducts().subscribe(products => {
      this.newProducts = products;
      this.startImageRotation(this.newProducts);
    });

    this.customer.getFeaturedProducts().subscribe(products => {
      this.featuredProducts = products;
      this.startImageRotation(this.featuredProducts);
    });
  }

  startImageRotation(products: Product[]) {
    products.forEach(product => {
      if (product.images && product.images.length > 1) {
        // initialize index if not set
        if (!(product._id in this.currentIndexMap)) {
          this.currentIndexMap[product._id] = 0;
        }

        // clear any old interval
        if (this.intervalRefs[product._id]) {
          clearInterval(this.intervalRefs[product._id]);
        }

        // set new interval
        this.intervalRefs[product._id] = setInterval(() => {
          const i = this.currentIndexMap[product._id] || 0;
          const len = product.images?.length || 1;
          this.currentIndexMap[product._id] = (i + 1) % len;
        }, 3000); // now will really stay 3s
      }
    });
  }

  getCurrentImage(product: Product): string {
    const idx = this.currentIndexMap[product._id] || 0;
    return product.images?.[idx] || '/assets/img/placeholder.svg';
  }

  ngOnDestroy() {
    // cleanup all intervals
    Object.values(this.intervalRefs).forEach(ref => clearInterval(ref));
  }
}
