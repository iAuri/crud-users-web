import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.services';
import { User } from '../../interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from '../user-card/user-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  imports: [CommonModule, UserCardComponent]
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  loading = true;
  showConfirmDeleteModal = false;
  showSuccessModal = false;
  userToDelete: User | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        console.log("Usuarios recibidos:", data);
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  promptDelete(id: number): void {
    this.userToDelete = this.users.find(user => user.id === id) || null;
    if (this.userToDelete) {
      this.showConfirmDeleteModal = true;
    }
  }

  cancelDelete(): void {
    this.showConfirmDeleteModal = false;
    this.userToDelete = null;
  }

  confirmDelete(): void {
    if (this.userToDelete) {
      // Here you would call the service to delete the user
      // For now, just remove it from the local array
      this.users = this.users.filter(user => user.id !== this.userToDelete!.id);
      this.showConfirmDeleteModal = false;
      this.showSuccessModal = true;
      this.userToDelete = null;

      // Hide success message after 2 seconds
      setTimeout(() => {
        this.showSuccessModal = false;
      }, 2000);
    }
  }

  onUpdateUser(id: number): void {
    console.log('Update user with id:', id);
    this.router.navigate(['/updateuser', id]);
  }

  onViewUser(id: number): void {
    console.log('View user with id:', id);
    this.router.navigate(['/user', id]);
  }
}