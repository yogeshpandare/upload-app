import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { catchError, delay, Observable, of } from 'rxjs';
import { UserData } from '../model/UserData';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private http: HttpClient) {}

  public uploadFile(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const postUrl = 'http://localhost:8080/api/v1/upload';
    return this.http.post(postUrl, formData, { responseType: 'text' });
  }

  public getUserData(): Observable<any> {
    const url = 'http://localhost:8080/api/v1/users';
    return this.http.get<UserData[]>(url);
  }
}
