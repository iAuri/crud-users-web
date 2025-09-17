import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../interfaces/user.interface';

interface ApiResponse {
  results: User[];
}

interface ApiUserResponse {
  data: User;
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
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
    return this.http.get<ApiUserResponse>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  // Crear nuevo usuario
  createUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  // Actualizar usuario
  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  // Eliminar usuario
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
