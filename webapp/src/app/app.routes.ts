import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Categories } from './components/manage/categories/categories';
import { CategoriesForm } from './components/manage/categories-form/categories-form';
import { Brands } from './components/manage/brands/brands';
import { BrandsForm } from './components/manage/brands-form/brands-form';
import { ProductsComponent } from './components/manage/products/products'; // ✅ FIXED
import { ProductsForm } from './components/manage/products-form/products-form';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'admin/categories',
    component: Categories
  },
  {
    path: 'admin/categories/add',
    component: CategoriesForm
  },
  {
    path: 'admin/categories/edit/:id',
    component: CategoriesForm
  },
  {
    path: 'admin/brands',
    component: Brands
  },
  {
    path: 'admin/brands/add',
    component: BrandsForm
  },
  {
    path: 'admin/brands/edit/:id',
    component: BrandsForm
  },
  {
    path: 'admin/products',
    component: ProductsComponent   // ✅ FIXED
  },
  {
    path: 'admin/products/add',
    component: ProductsForm
  },
  {
    path: 'admin/products/edit/:id',
    component: ProductsForm
  }
];
