import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Productservice } from '../../../services/productservice';
import { Product } from '../../../types/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink
  ],
  templateUrl: './products.html',
  styleUrls: ['./products.scss']
})
export class ProductsComponent implements OnInit {
  private productService = inject(Productservice);

  displayedColumns: string[] = ['_id', 'name', 'description', 'price', 'discount', 'action'];
  dataSource = new MatTableDataSource<Product>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.dataSource.filterPredicate = (row: Product, filter: string) => {
      const f = filter.trim().toLowerCase();
      return (
        (row.name?.toLowerCase().includes(f) ?? false) ||
        (row._id?.toString().toLowerCase().includes(f) ?? false)
      );
    };

    this.productService.getallproducts().subscribe({
      next: (raw: any) => {
        const list: Product[] = Array.isArray(raw)
          ? raw
          : Array.isArray(raw?.data)
          ? raw.data
          : [];
        this.dataSource.data = list;
        if (this.paginator) this.dataSource.paginator = this.paginator;
        if (this.sort) this.dataSource.sort = this.sort;
      },
      error: (err) => console.error('Failed to load products:', err)
    });
  }

  applyFilter(value: string) {
    this.dataSource.filter = (value ?? '').trim().toLowerCase();
  }

  deleteProduct(id: string) {
    this.productService.deleteproduct(id).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(p => p._id !== id);
      },
      error: (err) => console.error('Delete failed:', err)
    });
  }
}
