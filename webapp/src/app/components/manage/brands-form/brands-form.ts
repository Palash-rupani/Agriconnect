import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrandService } from '../../../services/brandservice';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-brands-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './brands-form.html',
  styleUrls: ['./brands-form.scss']
})
export class BrandsForm {
  name: string = '';
  isEdit = false;
  id: string | null = null;

  private brandService = inject(BrandService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log('Route param ID:', this.id);

    if (this.id) {
      this.isEdit = true;

      this.brandService.getBrandsById(this.id).subscribe({
        next: (result: any) => {
          console.log('Fetched brand:', result);
          this.name = result.name; // preload exactly like CategoriesForm
        },
        error: (err) => {
          console.error('Error fetching brand:', err);
          alert('Failed to load brand details.');
        }
      });
    }
  }

  add() {
    if (!this.name.trim()) return;

    if (this.isEdit && this.id) {
      this.brandService.updateBrands(this.id, { name: this.name }).subscribe({
        next: () => {
          alert('Brand successfully updated');
          this.router.navigate(['/admin/brands']);
        },
        error: (err) => {
          console.error('Error updating brand:', err);
          alert('Failed to update brand.');
        }
      });
    } else {
      this.brandService.addBrands(this.name).subscribe({
        next: () => {
          alert('Brand successfully added');
          this.name = '';
          this.router.navigate(['/admin/brands']);
        },
        error: (err) => {
          console.error('Error adding brand:', err);
          alert('Failed to add brand.');
        }
      });
    }
  }
}
