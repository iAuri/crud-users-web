import { Component } from '@angular/core';
import { UsersFormComponent } from '../../components/users-form/users-form.component';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [UsersFormComponent],
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {

}