import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Categories } from './components/manage/categories/categories';
import { CategoriesForm } from './components/manage/categories-form/categories-form';
import { Brands } from './components/manage/brands/brands';
import { BrandsForm } from './components/manage/brands-form/brands-form';

export const routes: Routes = [
  {
    path: '',
    component:Home
  },
  {
    path: 'admin/categories',
    component:Categories
  },
  {
    path: 'admin/categories/add',
    component:CategoriesForm
  },
  {
    path: 'admin/categories/edit/:id',
    component:CategoriesForm
  },
  {
    path: 'admin/brands',
    component:Brands
  },
  {
    path: 'admin/brands/add',
    component:BrandsForm
  },
  {
    path: 'admin/brands/edit/:id',
    component:BrandsForm
  }
];
