import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCard } from '../product-card/product-card';
import { Customer } from '../../services/customer';
import { Product } from '../../types/product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCard],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss']
})
export class ProductList implements OnInit {
  customer = inject(Customer);
  route = inject(ActivatedRoute);
  router = inject(Router);

  searchterm = '';
  categoryID = '';
  sortby = '';
  sortOrder = 1;
  brandID = '';
  page = 1;
  pagesize = 8;

  products: Product[] = [];
  categories: { id: string; name: string }[] = [];
  brands: { id: string; name: string }[] = [];

  totalProducts = 0;   // Total products matching the filters
  totalPages = 1;      // Total number of pages

  ngOnInit() {
    // ✅ Read query params when the component loads or changes
    this.route.queryParams.subscribe(params => {
      if (params['search']) this.searchterm = params['search'];
      if (params['category']) this.categoryID = params['category'];
      this.page = 1; // Reset page when query params change
      this.loadProducts();
    });

    this.loadCategories();
    this.loadBrands();
  }

  loadProducts() {
    const query: any = {
      page: this.page,
      pagesize: this.pagesize
    };

    if (this.searchterm && this.searchterm.trim() !== '') query.searchterm = this.searchterm.trim();
    if (this.categoryID && this.categoryID !== 'All' && this.categoryID !== 'undefined') query.categoryID = this.categoryID;
    if (this.brandID && this.brandID !== 'All' && this.brandID !== 'undefined') query.brandID = this.brandID;
    if (this.sortby && this.sortby !== 'undefined') query.sortby = this.sortby;
    if (this.sortOrder !== null && this.sortOrder !== undefined) query.sortorder = +this.sortOrder;

    console.log('📦 Sending query to API:', query);

    this.customer.getproducts(query).subscribe({
      next: (result: any) => {
        this.products = result.products || result; // handle backend returning products array or object
        this.totalProducts = result.totalProducts || this.products.length; // if backend sends total count
        this.totalPages = Math.ceil(this.totalProducts / this.pagesize);
      },
      error: err => console.error('❌ Error loading products:', err)
    });
  }

  applyFilters() {
    // ✅ Update the URL when filters are applied
    this.router.navigate([], {
      queryParams: {
        search: this.searchterm || null,
        category: this.categoryID || null
      },
      queryParamsHandling: 'merge'
    });

    this.page = 1; // Reset page when applying new filters
    this.loadProducts();
  }

  resetFilters() {
    this.searchterm = '';
    this.categoryID = '';
    this.sortby = '';
    this.sortOrder = 1;
    this.brandID = '';
    this.page = 1;
    this.router.navigate([], { queryParams: {} });
    this.loadProducts();
  }

  // ✅ Pagination buttons
  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadProducts();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadProducts();
    }
  }

  loadCategories() {
    this.customer.getcategories().subscribe({
      next: (result: any) => this.categories = result,
      error: err => console.error('Error loading categories:', err)
    });
  }

  loadBrands() {
    this.brands = [
      { id: 'brand1', name: 'AgroGrow' },
      { id: 'brand2', name: 'HarvestCo' },
      { id: 'brand3', name: 'GreenFarm' }
    ];
  }

  getCurrentImage(product: Product) {
    return product.images?.[0] || '';
  }
}
