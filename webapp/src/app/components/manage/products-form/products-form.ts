import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
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
    MatCheckboxModule,
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
    isnew: [false],       // ✅ match DB field exactly
    isfeatured: [false],  // ✅ match DB field exactly
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
          isnew: data.isnew ?? false,         // ✅ use isnew
          isfeatured: data.isfeatured ?? false // ✅ use isfeatured
        });

        // Handle category + brand mapping safely
        this.productForm.patchValue({
          categoryID: data.category?._id || data.categoryID || null,
          brandID: data.brand?._id || data.brandID || null,
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
  get imageControls() {
  return this.images.controls as FormControl[];
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

  Add() {
    if (this.productForm.invalid) return;

    const payload = {
      ...this.productForm.value,
    };

    console.log('🚀 ADD PAYLOAD:', payload);

    this.productservice.addproduct(payload as any).subscribe((result) => {
      console.log('✅ Product added successfully', result);
      this.router.navigate(['/admin/products']);
    });
  }

  Update() {
    if (!this.id || this.productForm.invalid) return;

    const rawForm = this.productForm.value;

    // ✅ Explicit payload mapping
    const payload: any = {
      name: rawForm.name,
      description: rawForm.description,
      price: rawForm.price,
      discount: rawForm.discount,
      images: rawForm.images || [],
      brand: rawForm.brandID,        // API expects "brand"
      category: rawForm.categoryID,  // API expects "category"
      isnew: !!rawForm.isnew,        // ✅ fix: match backend
      isfeatured: !!rawForm.isfeatured // ✅ fix: match backend
    };

    console.log('🚀 FINAL UPDATE PAYLOAD:', payload);

    this.productservice.updateproduct(this.id, payload).subscribe((result) => {
      console.log('✅ Product updated successfully', result);
      this.router.navigate(['/admin/products']);
    });
  }
}
