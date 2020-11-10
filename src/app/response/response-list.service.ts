import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject as rxSubject, throwError } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { Responses, ResponsesResolved } from '../shared/models/response';
import { SortColumn, SortDirection } from './response-list-sort.directive';
import { ResponsesService } from '../shared/services/responses.service';

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sortSubject(response: Responses[], column: SortColumn, direction: string): Responses[] {
  if (direction === '' || column === '') {
    return response;
  } else {
    return [...response].sort((a, b) => {
      const res = compare(`${a[column]}`, `${b[column]}`);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matchesSubject(response: Responses, term: string) {
  if (term === null || term.length === 0) { return true; }
  if (response.response !== null && response.response !== undefined && response.response.length > 0 ) {
    if (response.response.toLowerCase().includes(term.toLowerCase())) { return true; }
  }
  if (response.mnemonic !== null && response.mnemonic !== undefined && response.mnemonic.length > 0 ) {
    if (response.mnemonic.toLowerCase().includes(term.toLowerCase())) { return true; }
  }
  return false;
}

@Injectable({
  providedIn: 'root'
})
export class ResponseListService {
  private isLoading$ = new BehaviorSubject<boolean>(true);
  private searchSubject$ = new rxSubject<void>();
  private responsesList$ = new BehaviorSubject<Responses[]>([]);
  private responsesRecordCount$ = new BehaviorSubject<number>(0);
  private responseErroMessage$ = new BehaviorSubject<any>(null);
  private responsesResolvedData$ = new BehaviorSubject<ResponsesResolved>(null);
  // tslint:disable-next-line: variable-name
  private sortState: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private responseService: ResponsesService) {
    this.searchSubject$.pipe(
      tap(() => this.isLoading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this.isLoading$.next(false))
    ).subscribe(result => {
      this.responsesList$.next(result.responses);
      this.responsesRecordCount$.next(result.count);
      this.responseErroMessage$.next(result.error);
    });
    this.searchSubject$.next();
  }

  get responsesResolved$() { return this.responsesResolvedData$.asObservable(); }
  get responses$() { return this.responsesList$.asObservable(); }
  get responsesCount$() { return this.responsesRecordCount$.asObservable(); }
  get loading$() { return this.isLoading$.asObservable(); }
  get page() { return this.sortState.page; }
  set page(page: number) { this._set({page}); }
  get pageSize() { return this.sortState.pageSize; }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  get searchTerm() { return this.sortState.searchTerm; }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  set responseList(result: ResponsesResolved) {
    this.responsesResolvedData$.next(result);
    this.responsesList$.next(result.responses);
    this.responsesRecordCount$.next(result.count);
    this.searchSubject$.next();
  }

  private _set(patch: Partial<State>) {
    Object.assign(this.sortState, patch);
    this.searchSubject$.next();
  }

  private _search(): Observable<ResponsesResolved> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this.sortState;


    if (this.responsesResolvedData$.value.responses == null || this.responsesResolvedData$.value.responses.length === 0) {
      return of({responses: this.responsesResolvedData$.value.responses , count: 0});
    }

    // 1. filter
    const filteredSubjects = this.responsesResolvedData$.value.responses.filter(sub => matchesSubject(sub, searchTerm));
    // 2. sort
    let subjectsResults = sortSubject(filteredSubjects, sortColumn, sortDirection);
    const rows = subjectsResults.length;
    // 3. paginate
    subjectsResults = subjectsResults.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    // 4. state to new observable
    this.responsesList$.next(subjectsResults);

    return of({responses: subjectsResults, count: rows});
  }

  deleteResponse(responseToDelete: Responses): void {
    if (responseToDelete.responseId === 0) {
    } else {
      this.responseService.deleteAResponse(responseToDelete.questionId, responseToDelete.responseId).subscribe({
        next: () => this.onDeleteComplete(responseToDelete),
        error: err => throwError(err)
      });
    }
  }

  onDeleteComplete(deletedResponse: Responses): void {
    const index =  this.responsesResolvedData$.value.responses.findIndex(r => r.responseId === deletedResponse.responseId);
    if (index) {
      const subjectsCopy = JSON.parse(JSON.stringify(this.responsesResolvedData$.value.responses));
      subjectsCopy.splice(+index, 1);
      const reccount = subjectsCopy.length;
      this.responsesResolvedData$.next({responses: subjectsCopy, count: reccount});
      this.searchSubject$.next();
    }
  }
}
