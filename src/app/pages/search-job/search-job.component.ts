import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DropdownComponent } from '../../elements/dropdown/dropdown.component';
import { NgbModal, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchJobService } from './search-job.service';
import { Job } from '../interfaces/job.interface';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize, of, Subject, tap } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { JsonPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-job',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    DropdownComponent,
    HttpClientModule,
    JsonPipe,
    FormsModule,
    NgbToastModule
  ],
  providers: [
    SearchJobService
  ],
  templateUrl: './search-job.component.html',
  styleUrl: './search-job.component.css'
})
export class SearchJobComponent implements OnInit, OnDestroy {

  myJobs: Job[] = [] as Job[];
  selectedJob: Job = {
    id: 0,
    title: '',
    company: '',
    salary: '',
    location: '',
    companylogo: '',
    url: ''
  };
  private unsubscribe$ = new Subject<void>();
  showSuccess = false;
  showUpdateSuccess = false;

  constructor(
    private searchJobService: SearchJobService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    console.log("ngOnInit() {...");

    this.searchJobService.getAllJobs().pipe(
      takeUntil(this.unsubscribe$),
      catchError((error: HttpErrorResponse) => {
        console.error('Failed to load jobs:', error.message);
        return of([]);
      }),
      finalize(() => {
        console.debug('Job loading completed');
      }),
      tap((jobs: Job[]) => {
        this.myJobs = jobs || [];
      })
    ).subscribe({
      next: (jobs: Job[]) => {
        console.debug(`Successfully loaded ${jobs.length} jobs`);
      },
      error: (error: Error) => {
        console.error('Job subscription error:', error);
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  openJobModal(content: TemplateRef<any>, job?: Job) {
    this.selectedJob = job ? { ...job } : {
      id: 0,
      title: '',
      company: '',
      salary: '',
      location: '',
      companylogo: '',
      url: ''
    };
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  dropdown_item = {
    select: 'Newest',
    value: ['Newest', 'Latest', 'Oldest'],
    image: ['assets/images/svg/arrow-down-short.svg']
  }

  createJob(job: Job): void {
    this.searchJobService.createJob(job).pipe(
      takeUntil(this.unsubscribe$),
      catchError((error: HttpErrorResponse) => {
        console.error('Job creation error:', error);
        return of(null);
      }),
      tap((createdJob: Job | null) => {
        if (createdJob) {
          this.myJobs.unshift(createdJob);
          this.showSuccess = true;
          setTimeout(() => this.showSuccess = false, 3000); // Toast verschwindet nach 3 Sekunden
        }
      })
    ).subscribe();
  }

  updateJob(id: number, job: Job): void {
    this.searchJobService.updateJob(id, job).pipe(
      takeUntil(this.unsubscribe$),
      catchError((error: HttpErrorResponse) => {
        console.error('Job update error:', error);
        return of(null);
      }),
      tap((updatedJob: Job | null) => {
        if (updatedJob) {
          const index = this.myJobs.findIndex(j => j.id === id);
          if (index !== -1) {
            this.myJobs[index] = updatedJob;
            this.showUpdateSuccess = true;
            setTimeout(() => this.showUpdateSuccess = false, 3000);
          }
        }
      })
    ).subscribe();
  }

  private isJobValid(): boolean {
    return !!(
      this.selectedJob.title?.trim() &&
      this.selectedJob.company?.trim() &&
      this.selectedJob.location?.trim()
    );
  }

  saveJob(): void {
    if (!this.isJobValid()) {
      alert('Bitte füllen Sie mindestens Titel, Firma und Standort aus.');
      return;
    }
    
    if (this.selectedJob.id) {
      this.updateJob(this.selectedJob.id, this.selectedJob);
    } else {
      this.createJob(this.selectedJob);
    }
    this.modalService.dismissAll();
  }

  deleteJob(id: number): void {
    if (confirm('Sind Sie sicher, dass Sie diesen Job löschen möchten?')) {
      this.searchJobService.deleteJob(id).pipe(
        takeUntil(this.unsubscribe$),
        catchError((error: HttpErrorResponse) => {
          console.error('Job delete error:', error);
          return of(null);
        }),
        tap(() => {
          this.myJobs = this.myJobs.filter(job => job.id !== id);
        })
      ).subscribe();
    }
  }
}
