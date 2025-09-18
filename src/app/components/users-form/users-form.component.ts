
import { Component, Input, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.services';
import { User } from '../../interfaces/user.interface';


@Component({
  selector: 'app-users-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent {
  @Input() idUser: string = "";
  
  userForm: FormGroup;
  userService = inject(UserService);
  router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      image: ['https://i.pravatar.cc/300']
    });
  }

  ngOnInit(): void {
    if (this.idUser) {
      this.userService.getUser(this.idUser).subscribe((user: User) => {
        this.userForm.patchValue({
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          image: user.image
        });
      });
    }
  }

  getDataForm(): void {
    if (this.userForm.valid) {
      const userData: Partial<User> = this.userForm.value;
      if (this.idUser) {
        this.userService.updateUser(this.idUser, userData).subscribe(response => {
          console.log('User updated successfully', response);
          this.router.navigate(['/home']);
        });
      } else {
        this.userService.createUser(userData).subscribe(response => {
          console.log('User created successfully', response);
          this.router.navigate(['/home']);
        });
      }
    }
  }
}
