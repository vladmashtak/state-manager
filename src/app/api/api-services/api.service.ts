import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private static BASE_URL = 'http://localhost/v1';

  constructor(private http: HttpClient) {
  }
}
