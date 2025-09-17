import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-user-card',
  standalone: true,
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
  imports: [CommonModule]
})
export class UserCardComponent {
  @Input() user!: User;   // Recibe un usuario desde UsersComponent
  @Output() delete = new EventEmitter<number>(); // Emitir evento al padre
  @Output() update = new EventEmitter<number>();
  @Output() view = new EventEmitter<number>();

  onDelete() {
    this.delete.emit(this.user.id);
  }

  onUpdate() {
    this.update.emit(this.user.id);
  }

  onView() {
    this.view.emit(this.user.id);
  }
}
