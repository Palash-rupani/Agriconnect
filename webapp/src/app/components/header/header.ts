import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category';
import { category } from '../../types/category';
import { FormsModule } from '@angular/forms';

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
  private router = inject(Router);

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService.getCategories().subscribe((data: category[]) => {
      this.categorylist = data;
    });
  }

  onSearch(): void {
    const query = this.searchQuery.trim();
    if (query) {
      this.router.navigateByUrl('/products?search=' + encodeURIComponent(query));
    }
  }
}
