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
}
