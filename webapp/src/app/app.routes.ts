import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Categories } from './components/manage/categories/categories';
import { CategoriesForm } from './components/manage/categories-form/categories-form';
import { Brands } from './components/manage/brands/brands';
import { BrandsForm } from './components/manage/brands-form/brands-form';
import { ProductsComponent } from './components/manage/products/products'; // ✅ FIXED
import { ProductsForm } from './components/manage/products-form/products-form';
import { Product } from './types/product';
import { ProductList } from './components/product-list/product-list';
import { ProductDetails } from './components/product-details/product-details';
import { Register } from './components/register/register';
import { Login } from './components/login/login';
import { authgaurd } from './core/auth-guard';
import { AdminDashboard } from './components/manage/admin-dashboard/admin-dashboard';
import { Adminguard } from './core/admin-guard';
import { Profile } from './components/profile/profile';


export const routes: Routes = [
  {
    path: '',
    component: Home,
    canActivate : [authgaurd]
  },
  {
    path: 'admin/categories',
    component: Categories,
    canActivate : [Adminguard]
  },
  {
    path: 'admin/categories/add',
    component: CategoriesForm,
    canActivate : [Adminguard]
  },
  {
    path: 'admin/categories/edit/:id',
    component: CategoriesForm,
    canActivate : [Adminguard]
  },
  {
    path: 'admin/brands',
    component: Brands,
    canActivate : [Adminguard]
  },
  {
    path: 'admin/brands/add',
    component: BrandsForm,
    canActivate : [Adminguard]
  },
  {
    path: 'admin/brands/edit/:id',
    component: BrandsForm,
    canActivate : [Adminguard]
  },
  {
    path: 'admin/products',
    component: ProductsComponent,
    canActivate : [Adminguard]
  },
  {
    path: 'admin/products/add',
    component: ProductsForm,
    canActivate : [Adminguard]
  },
  {
    path: 'admin/products/edit/:id',
    component: ProductsForm,
    canActivate : [Adminguard]
  },
  {
    path: 'products',
    component: ProductList,
    canActivate : [authgaurd]
  },
  {
    path: 'products/:id',
    component: ProductDetails,
    canActivate : [authgaurd]
  },
  {
    path: 'register',
    component: Register
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'admin',
    component: AdminDashboard,
  },
  {
    path: 'profile',
    component: Profile,
    canActivate : [authgaurd]
  }
];
