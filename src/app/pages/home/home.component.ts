import { Component } from '@angular/core';
import { UsersComponent } from '../../components/users/users.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [UsersComponent]
})
export class HomeComponent {

}
