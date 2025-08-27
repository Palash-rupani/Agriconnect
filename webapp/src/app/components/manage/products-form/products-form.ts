import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormArray,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Brand } from '../../../types/brand';
import { category } from '../../../types/category';
import { CategoryService } from '../../../services/category';
import { BrandService } from '../../../services/brandservice';
import { Productservice } from '../../../services/productservice';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './products-form.html',
  styleUrls: ['./products-form.scss'],
})
export class ProductsForm {
  private formBuilder = inject(FormBuilder);

  productForm = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(3)]],
    description: [null, [Validators.required, Validators.minLength(10)]],
    price: [null, [Validators.required]],
    discount: [],
    images: this.formBuilder.array([]),
    categoryID: [null, [Validators.required]],
    brandID: [null, [Validators.required]],
  });

  brands: Brand[] = [];
  categories: category[] = [];
  isLoadingCategories = true;
  isLoadingBrands = true;

  categoryservice = inject(CategoryService);
  brandservice = inject(BrandService);
  productservice = inject(Productservice);
  router = inject(Router);
  route = inject(ActivatedRoute);

  id: string | null = null;

  ngOnInit() {
    // Load categories
    this.categoryservice.getCategories().subscribe((data) => {
      this.categories = data;
      this.isLoadingCategories = false;
    });

    // Load brands
    this.brandservice.getBrands().subscribe((data) => {
      this.brands = data;
      this.isLoadingBrands = false;
    });

    // Load product if editing
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productservice.getallproductbyid(this.id).subscribe((data: any) => {
        console.log('RAW API RESPONSE:', data);

        // Patch main fields
        this.productForm.patchValue({
          name: data.name,
          description: data.description,
          price: data.price,
          discount: data.discount,
        });

        // Handle category + brand mapping safely
        this.productForm.patchValue({
          categoryID:
            data.categoryID ||
            data.CategoryID ||
            data.category_id ||
            data.category ||
            data.category?._id ||
            null,
          brandID:
            data.brandID ||
            data.BrandID ||
            data.brand_id ||
            data.brand ||
            data.brand?._id ||
            null,
        });

        // Patch images
        if (data.images && Array.isArray(data.images)) {
          this.images.clear();
          data.images.forEach((img: string) => {
            this.images.push(this.formBuilder.control(img, Validators.required));
          });
        }

        console.log('Form after patch:', this.productForm.value);
      });
    }
  }

  get images() {
    return this.productForm.get('images') as FormArray;
  }

  addImage() {
    this.images.push(this.formBuilder.control('', Validators.required));
  }

  removeImage(index: number) {
    this.images.removeAt(index);
  }

  addproduct() {
    if (this.productForm.invalid) return;

    this.productservice
      .addproduct(this.productForm.value as any)
      .subscribe((result) => {
        console.log('Product added successfully', result);
        this.router.navigate(['/admin/products']);
      });
  }

  Update() {
    if (!this.id || this.productForm.invalid) return;

    this.productservice
      .updateproduct(this.id, this.productForm.value as any)
      .subscribe((result) => {
        console.log('Product updated successfully', result);
        this.router.navigate(['/admin/products']);
      });
  }
}
