import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../services/category';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-categories-form',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatButtonModule,MatIconModule],
  templateUrl: './categories-form.html',
  styleUrls: ['./categories-form.scss']
})
export class CategoriesForm {
  name: string = '';
  route=inject(ActivatedRoute);
  isedid=false;
  id:string|null=null;
  ngOnInit() {
  this.id = this.route.snapshot.params['id'];   // ✅ assign to class property
  console.log("ID:", this.id);

  if (this.id) {
    this.isedid = true;
    this.categoryService.getCategoriesById(this.id).subscribe((result: any) => {
      console.log(result);
      this.name = result.name;
    });
  }
}



  private categoryService = inject(CategoryService);
  private router = inject(Router);

  add() {
  if (!this.name.trim()) return;

  if (this.isedid && this.id) {
    this.categoryService.updateCategory(this.id, { name: this.name }).subscribe({
      next: () => {
        alert('Category successfully updated');
        this.router.navigate(['/admin/categories']);
      },
      error: (err) => {
        console.error('Error updating category:', err);
        alert('Failed to update category.');
      }
    });
  } else {
    this.categoryService.addCategory(this.name).subscribe({
      next: (response) => {
        alert('Category successfully added: ' + JSON.stringify(response));
        this.name = '';
        this.router.navigate(['/admin/categories']);
      },
      error: (err) => {
        console.error('Error adding category:', err);
        alert('Failed to add category.');
      }
    });
  }
}
}
