import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../interfaces/job.interface';

const API_URL = 'http://localhost:3000/api/jobs';

@Injectable({
  providedIn: 'root'
})
export class SearchJobService {
  private http = inject(HttpClient);

  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${API_URL}`);
  }

  getJobById(id: number): Observable<Job> {
    return this.http.get<Job>(`${API_URL}/${id}`);
  }

  createJob(job: Job): Observable<Job> {
    return this.http.post<Job>(`${API_URL}`, job);
  }

  updateJob(id: number, job: Job): Observable<Job> {
    return this.http.put<Job>(`${API_URL}/${id}`, job);
  }

  deleteJob(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}
