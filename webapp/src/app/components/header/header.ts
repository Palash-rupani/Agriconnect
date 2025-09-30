import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Customer } from '../../services/customer';

import { CategoryService } from '../../services/category';
import { category } from '../../types/category';
import { Auth } from '../../services/auth';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header implements OnInit {
  categorylist: category[] = [];
  searchQuery: string = '';
  activeCategory: string | null = null;
  customerservice = inject(Customer);

  private router = inject(Router);

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.customerservice.getcategories().subscribe((data: category[]) => {
      this.categorylist = data;
    });
  }

  onSearch(): void {
    const query = this.searchQuery.trim();
    if (query) {
      this.router.navigate(['/products'], { queryParams: { search: query } });
    }
  }

  onCategorySelect(categoryId: string): void {
    if (categoryId) {
      this.activeCategory = categoryId;
      this.router.navigate(['/products'], { queryParams: { category: categoryId } });
    }
  }
  authservice=inject(Auth);

  onLogout(){
    this.authservice.logout();
    this.router.navigate(['/login']);
  }

}
