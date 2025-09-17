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
  loading = true;
  
  // Properties for deletion modal
  showConfirmDeleteModal = false;
  showSuccessModal = false;
  userToDelete: User | null = null;

  // Properties for pagination
  allUsers: User[] = [];
  paginatedUsers: User[] = [];
  currentPage = 1;
  itemsPerPage = 6;
  totalPages = 0;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.allUsers = data;
        this.totalPages = Math.ceil(this.allUsers.length / this.itemsPerPage);
        this.updatePaginatedUsers();
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  // --- PAGINATION LOGIC ---
  updatePaginatedUsers(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUsers = this.allUsers.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedUsers();
    }
  }

  // --- DELETE LOGIC ---
  promptDelete(id: number): void {
    this.userToDelete = this.allUsers.find(user => user.id === id) || null;
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
      this.allUsers = this.allUsers.filter(user => user.id !== this.userToDelete!.id);
      this.totalPages = Math.ceil(this.allUsers.length / this.itemsPerPage);

      // Adjust current page if it's now out of bounds
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
      }
      // If all users were deleted, reset to page 1
      if (this.currentPage === 0 && this.totalPages > 0) {
        this.currentPage = 1;
      }

      this.updatePaginatedUsers();
      
      this.showConfirmDeleteModal = false;
      this.showSuccessModal = true;
      this.userToDelete = null;

      setTimeout(() => {
        this.showSuccessModal = false;
      }, 2000);
    }
  }

  // --- NAVIGATION ---
  onUpdateUser(id: number): void {
    this.router.navigate(['/updateuser', id]);
  }

  onViewUser(id: number): void {
    this.router.navigate(['/user', id]);
  }
  
  // Helper to get pages for pagination controls
  get pages(): number[] {
    const pagesArray = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pagesArray.push(i);
    }
    return pagesArray;
  }
}
