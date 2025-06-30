import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from '../models/member.model';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000/api/membres';
  private tasksUrl = 'http://localhost:3000/api/taches';

  constructor(private http: HttpClient) { }

  // Member-related methods

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.apiUrl);
  }

  addMember(member: Omit<Member, 'id'>): Observable<Member> {
    return this.http.post<Member>(this.apiUrl, member);
  }

  updateMember(member: Member): Observable<Member> {
    return this.http.put<Member>(`${this.apiUrl}/${member.id}`, member);
  }

  deleteMember(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Task-related methods

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl);
  }

  addTask(task: Omit<Task, 'id'>): Observable<Task> {
    return this.http.post<Task>(this.tasksUrl, task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.tasksUrl}/${task.id}`, task);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete<any>(`${this.tasksUrl}/${id}`);
  }
}
