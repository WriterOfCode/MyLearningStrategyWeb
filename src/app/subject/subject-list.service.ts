import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject as rxSubject, throwError } from 'rxjs';
import { debounceTime, delay, switchMap, tap, map, catchError } from 'rxjs/operators';
import { Resolve,  ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Subject, SubjectsResolved } from '../shared/models/subjects';
import { SortColumn, SortDirection} from './subject-list-sort.directive';
import { SubjectService } from '../shared/services/subject.service';

interface SubjectListState {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sortSubject(subjects: Subject[], column: SortColumn, direction: string): Subject[] {
  if (direction === '' || column === '' ) {
    return subjects;
  } else {
    return [...subjects].sort((a, b) => {
      const res = compare(`${a[column]}`, `${b[column]}`);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matchesSubject(subject: Subject, term: string) {
  if (term === null || term.length === 0) { return true; }
  if (subject.name !== null && subject.name !== undefined && subject.name.length > 0) {
    if (subject.name.toLowerCase().includes(term.toLowerCase())) { return true; }
  }
  if (subject.description !== null && subject.description !== undefined && subject.description.length > 0 ) {
    if (subject.description.toLowerCase().includes(term.toLowerCase())) { return true; }
  }
  if (subject.keywords !== null && subject.keywords !== undefined && subject.keywords.length > 0) {
    if (subject.keywords.toLowerCase().includes(term.toLowerCase())) { return true; }
  }
  return false;
}

@Injectable({
  providedIn: 'root'
})
export class SubjectListService implements Resolve<SubjectsResolved> {
  private isLoading$ = new BehaviorSubject<boolean>(true);
  private searchSubject$ = new rxSubject<void>();

  private subjectsFilteredList$ = new BehaviorSubject<Subject[]>([]);
  private subjectsFilteredListCount$ = new BehaviorSubject<number>(0);

  private subjectsResolvedData$ = new BehaviorSubject<SubjectsResolved>(null);
  // tslint:disable-next-line: variable-name
  private sortState: SubjectListState = {
    page: 1,
    pageSize: 5,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private subjectService: SubjectService) {
    this.searchSubject$.pipe(
      tap(() => this.isLoading$.next(true)),
      debounceTime(200),
      switchMap(() => this.filter()),
      delay(200),
      tap(() => this.isLoading$.next(false))
    ).subscribe(result => {
      this.subjectsFilteredList$.next(result.subjects);
      this.subjectsFilteredListCount$.next(result.count);
    });
    this.searchSubject$.next();
  }

  get subjects$() { return this.subjectsFilteredList$.asObservable(); }
  get subjectsCount$() { return this.subjectsFilteredListCount$.asObservable(); }

  get subjectsResolved$() { return this.subjectsResolvedData$.asObservable(); }
  get loading$() { return this.isLoading$.asObservable(); }
  get page() { return this.sortState.page; }
  set page(page: number) { this._set({page}); }
  get pageSize() { return this.sortState.pageSize; }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  get searchTerm() { return this.sortState.searchTerm; }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  set subjectList(result: SubjectsResolved) {
    this.subjectsResolvedData$.next(result);
    this.searchSubject$.next();
    this.subjectsFilteredList$.next(result.subjects);
    this.subjectsFilteredListCount$.next(result.count);
  }

  private _set(patch: Partial<SubjectListState>) {
    Object.assign(this.sortState, patch);
    this.searchSubject$.next();
  }

  private filter(): Observable<SubjectsResolved> {

    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this.sortState;

    if (this.subjectsResolvedData$.value == null) {
      return of({subjects: [] , count: 0});
    }
    if (this.subjectsResolvedData$.value.subjects == null || this.subjectsResolvedData$.value.subjects.length === 0) {
      return of({subjects: [] , count: 0});
    }
    // 1. filter
    const filteredSubjects = this.subjectsResolvedData$.value.subjects.filter(sub => matchesSubject(sub, searchTerm));
    // 2. sort
    let subjectsResults = sortSubject(filteredSubjects, sortColumn, sortDirection);
    const rows = subjectsResults.length;
    // 3. paginate
    subjectsResults = subjectsResults.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    // 4. state to new observable
    this.subjectsFilteredList$.next(subjectsResults);

    return of({subjects: subjectsResults, count: rows});
  }

  deleteSubject(subjectToDelete: Subject): void {
    if (subjectToDelete.bodyOfKnowledgeId === 0) {
    } else {
      console.log(JSON.stringify(subjectToDelete));
      this.subjectService.deleteSubject(subjectToDelete.bodyOfKnowledgeId).subscribe({
        next: () => this.onDeleteComplete(subjectToDelete),
        error: err => throwError(err)
      });
    }
  }

  onDeleteComplete(deletedSubject: Subject): void {
    const index =  this.subjectsResolvedData$.value.subjects.findIndex(s => s.bodyOfKnowledgeId === deletedSubject.bodyOfKnowledgeId);
    if (index) {
      const subjectsCopy = JSON.parse(JSON.stringify(this.subjectsResolvedData$.value.subjects));
      subjectsCopy.splice(+index, 1);
      const reccount = subjectsCopy.length;
      this.subjectsResolvedData$.next({subjects: subjectsCopy, count: reccount});
      this.searchSubject$.next();
    }
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<SubjectsResolved> {
    console.log('Subject List Service Resolver');
    return this.subjectService.getSubjects()
    .pipe(
      map(sub => ({ subjects: sub, count: sub.length, error: '' })),
      // tap(subResolved => this.subjectsResolvedData$.next(subResolved)),
      catchError(error => {
        const message = `Retrieval error: ${JSON.stringify(error)}`;
       // this.subjectsResolvedData$.next({ subjects: [], count: 0 , error: message });
        return of({ subjects: [], count: 0 , error: message });
      })
    );
  }
}
