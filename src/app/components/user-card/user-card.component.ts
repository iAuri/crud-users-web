import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-card',
  standalone: true,
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
  imports: [CommonModule, RouterLink]
})
export class UserCardComponent {
  @Input() user!: User;   // Recibe un usuario desde UsersComponent
  @Output() delete = new EventEmitter<number>(); // Emitir evento al padre

  onDelete() {
    this.delete.emit(this.user.id);
  }
}



