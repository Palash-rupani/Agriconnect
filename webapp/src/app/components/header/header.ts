import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category';
import { category } from '../../types/category';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ CommonModule, MatButtonModule, MatIconModule, MatToolbarModule, MatMenuModule ],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']   // ✅ plural
})
export class Header implements OnInit {
  categorylist: category[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService.getCategories().subscribe((data: category[]) => {
      this.categorylist = data;
    });
  }
}
