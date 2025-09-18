import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../interfaces/user.interface';

interface ApiResponse {
  results: User[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://peticiones.online/api/users';

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  getUsers(): Observable<User[]> {
    return this.http.get<ApiResponse>(this.apiUrl).pipe(
      map((response) => response.results) // 👈 Extraemos solo los usuarios
    );
  }

  // Obtener usuario por id
  getUser(_id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${_id}`);
  }

  // Crear nuevo usuario
  createUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  // Actualizar usuario
  updateUser(_id: string, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${_id}`, user);
  }

  // Eliminar usuario
  deleteUser(_id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${_id}`);
  }
}
