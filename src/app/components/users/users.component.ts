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

  onDeleteUser(id: number): void {
    console.log('Delete user with id:', id);
    // Aquí llamarías al servicio de usuario para borrar el usuario
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
