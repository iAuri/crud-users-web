import { Component, Input } from '@angular/core';
import { UsersFormComponent } from '../../components/users-form/users-form.component';

@Component({
  selector: 'app-uptade-user',
  standalone: true,
  imports: [UsersFormComponent],
  templateUrl: './uptade-user.component.html',
  styleUrls: ['./uptade-user.component.css']
})
export class UptadeUserComponent {
  @Input() _id: string = "";
}