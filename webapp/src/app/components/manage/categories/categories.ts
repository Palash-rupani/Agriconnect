import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../services/category'; // ✅ Correct path
import { RouterLink } from '@angular/router';

export interface PeriodicElement {
  _id: string;
  name: string;
}

@Component({
  selector: 'app-categories',
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
  templateUrl: './categories.html',
  styleUrls: ['./categories.scss'],
})
export class Categories implements OnInit {

  private categoryService = inject(CategoryService);

  displayedColumns: string[] = ['_id', 'Name', 'Action'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);

  ngOnInit() {
    const token = localStorage.getItem('token');
    console.log('Stored Token in Categories Component:', token);
    this.categoryService.getCategories().subscribe((data: PeriodicElement[]) => {
      this.dataSource.data = data;
    });
  }
    deleteCategory(id: string) {
  console.log('Deleting category with ID:', id);
  this.categoryService.deleteCategoryByID(id).subscribe((result) => {
    console.log('Category deleted:', result);
    this.dataSource.data = this.dataSource.data.filter(item => item._id !== id);
  });
}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEdit(row: PeriodicElement) {
    console.log('Edit:', row);
  }

  onDelete(row: PeriodicElement) {
    console.log('Delete:', row);
  }
}
