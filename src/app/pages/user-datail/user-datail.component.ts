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
    const userId = this.route.snapshot.paramMap.get('id');
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
  }

  deleteUser(): void {
    if (this.user && confirm(`¿Estás seguro de que quieres eliminar a ${this.user.first_name} ${this.user.last_name}?`)) {
      alert('Usuario eliminado. Volviendo al listado.');
      this.router.navigate(['/home']);
    }
  }
}
