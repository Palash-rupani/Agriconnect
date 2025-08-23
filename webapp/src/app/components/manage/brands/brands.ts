import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BrandService } from '../../../services/brandservice';
import { Brand } from '../../../types/brand';

@Component({
  selector: 'app-brands',
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
  templateUrl: './brands.html',
  styleUrl: './brands.scss'
})
export class Brands implements OnInit {
  private brandService = inject(BrandService);

  displayedColumns: string[] = ['_id', 'name', 'action'];
  dataSource = new MatTableDataSource<Brand>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.dataSource.filterPredicate = (row: Brand, filter: string) => {
      const f = filter.trim().toLowerCase();
      return (row.name?.toLowerCase().includes(f) ?? false) ||
             (row._id?.toString().toLowerCase().includes(f) ?? false);
    };

    this.brandService.getBrands().subscribe({
      next: (raw: any) => {
        console.log('Brands API raw response:', raw);

        // Accept either array or {data: array}
        const list: Brand[] = Array.isArray(raw) ? raw
                          : Array.isArray(raw?.data) ? raw.data
                          : [];

        console.log('Parsed brand list:', list);
        this.dataSource.data = list;

        // Attach paginator & sort after data arrives
        if (this.paginator) this.dataSource.paginator = this.paginator;
        if (this.sort) this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('Failed to load brands:', err);
      }
    });
  }

  applyFilter(value: string) {
    this.dataSource.filter = (value ?? '').trim().toLowerCase();
  }

  deleteBrand(id: string) {
    console.log('Deleting brand with ID:', id);
    this.brandService.deleteBrandsByID(id).subscribe({
      next: (res) => {
        console.log('Brand deleted:', res);
        this.dataSource.data = this.dataSource.data.filter(b => b._id !== id);
      },
      error: (err) => console.error('Delete failed:', err)
    });
  }

  onEdit(row: Brand) {
    console.log('Edit brand:', row);
  }

  onDelete(row: Brand) {
    this.deleteBrand(row._id);
  }
}
