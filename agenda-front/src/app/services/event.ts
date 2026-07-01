import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'http://localhost:8080/api/events';

  constructor(private http: HttpClient){}

  findAll(): Observable<Event[]>{
    return this.http.get<Event[]>(this.apiUrl);
  }

  findById(id: number): Observable<Event>{
    return this.http.get<Event>(`${this.apiUrl}/${id}`);
  }

  save(event: Event): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event);
  }

  update(id: number, event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/${id}`, event);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}