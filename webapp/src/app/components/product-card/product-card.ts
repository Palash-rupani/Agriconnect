import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../types/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.scss']
})
export class ProductCard {
  @Input() product!: Product;
  @Input() currentImage!: string;  // ✅ make sure this is here

  get badgeLabel(): string | null {
    if (this.product.isnew) return 'New';
    if (this.product.isfeatured) return 'Featured';
    return null;
  }

  get hasDiscount(): boolean {
    return !!this.product.discount && this.product.discount > 0;
  }

  get finalPrice(): number {
    if (this.hasDiscount && this.product.price) {
      return this.product.price - (this.product.price * (this.product.discount! / 100));
    }
    return this.product.price || 0;
  }
}
