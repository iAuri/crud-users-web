import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.services';
import { User } from '../../interfaces/user.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-datail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-datail.component.html',
  styleUrl: './user-datail.component.css'
})
export class UserDatailComponent implements OnInit {
  user: User | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userId = params.get('id');
      if (userId) {
        this.userService.getUser(+userId).subscribe({
          next: (data) => {
            this.user = data;
            this.loading = false;
          },
          error: (err) => {
            console.error('Error fetching user:', err);
            this.loading = false;
            this.router.navigate(['/home']);
          }
        });
      }
    });
  }

  showConfirmDeleteModal = false;
  showSuccessModal = false;

  promptDelete(): void {
    this.showConfirmDeleteModal = true;
  }

  cancelDelete(): void {
    this.showConfirmDeleteModal = false;
  }

  confirmDelete(): void {
    if (this.user) {
      this.showConfirmDeleteModal = false;
      this.showSuccessModal = true;

      // Esto simula que carga
      setTimeout(() => {
        this.router.navigate(['/home']);
        this.showSuccessModal = false;
      }, 2000);
    }
  }
}
