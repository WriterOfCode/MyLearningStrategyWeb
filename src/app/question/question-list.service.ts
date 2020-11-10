import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject as rxSubject, throwError } from 'rxjs';
import { catchError, debounceTime, delay, map, switchMap, tap } from 'rxjs/operators';
import { Questions, QuestionsResolved } from '../shared/models/questions';
import { SortColumn, SortDirection} from './quesiton-list-sort.directive';
import { QuestionService } from '../shared/services/question.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sortQuestions( questions: Questions[], column: SortColumn, direction: string): Questions[] {
  if (direction === '' || column === '') {
    return questions;
  } else {
    return [...questions].sort((a, b) => {
      const res = compare(`${a[column]}`, `${b[column]}`);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matchesQuestions(question: Questions, term: string) {
  if (term === null || term.length === 0 ) { return true; }
  if (question.question !== null && question.question !== undefined && question.question.length > 0 ) {
    if (question.question.toLowerCase().includes(term.toLowerCase())) { return true; }
  }
  if (question.mnemonic !== null && question.mnemonic !== undefined && question.mnemonic.length > 0 ) {
    if (question.mnemonic.toLowerCase().includes(term.toLowerCase())) { return true; }
  }
  return false;
}

@Injectable({
  providedIn: 'root'
})
export class QuestionListService implements Resolve<QuestionsResolved>{
  private isLoading$ = new BehaviorSubject<boolean>(true);
  private searchQuestions$ = new rxSubject<void>();
  private questionsList$ = new BehaviorSubject<Questions[]>([]);
  private questionsRecordCount$ = new BehaviorSubject<number>(0);
  private responseErroMessage$ = new BehaviorSubject<any>(null);
  private questionsResolvedData$ = new BehaviorSubject<QuestionsResolved>(null);
  // tslint:disable-next-line: variable-name
  private sortState: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private questionsService: QuestionService) {
    this.searchQuestions$.pipe(
      tap(() => this.isLoading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this.isLoading$.next(false))
    ).subscribe(result => {
      this.questionsList$.next(result.questions);
      this.questionsRecordCount$.next(result.count);
      this.responseErroMessage$.next(result.error);
    });
    this.searchQuestions$.next();
  }


  get questionsResolved$() { return this.questionsResolvedData$.asObservable(); }
  get questions$() { return this.questionsList$.asObservable(); }
  get questionsCount$() { return this.questionsRecordCount$.asObservable(); }
  get loading$() { return this.isLoading$.asObservable(); }
  get page() { return this.sortState.page; }
  set page(page: number) { this._set({page}); }
  get pageSize() { return this.sortState.pageSize; }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  get searchTerm() { return this.sortState.searchTerm; }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  set quesitonList(result: QuestionsResolved) {
    this.questionsResolvedData$.next(result);
    this.questionsList$.next(result.questions);
    this.questionsRecordCount$.next(result.count);
    this.searchQuestions$.next();
  }

  private _set(patch: Partial<State>) {
    Object.assign(this.sortState, patch);
    this.searchQuestions$.next();
  }

  private _search(): Observable<QuestionsResolved> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this.sortState;

    if (this.questionsResolvedData$.value.questions == null || this.questionsResolvedData$.value.questions.length === 0) {
      return of({questions: this.questionsResolvedData$.value.questions , count: 0});
    }
    // 1. filter
    const filteredQuestions = this.questionsResolvedData$.value.questions.filter(sub => matchesQuestions(sub, searchTerm));
    // 2. sort
    console.log(`Sort on: ${JSON.stringify(this.sortState)}`);
    let questionsResults = sortQuestions(filteredQuestions, sortColumn, sortDirection);
    const rows = questionsResults.length;
    // 3. paginate
    questionsResults = questionsResults.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    // 4. state to new observable
    this.questionsList$.next(questionsResults);

    return of({questions: questionsResults, count: rows});
  }

  deleteQuestion(questionToDelete: Questions): void {
    if (questionToDelete.bodyOfKnowledgeId === 0) {
    } else {
      console.log(JSON.stringify(questionToDelete));
      this.questionsService.deleteQuestion(questionToDelete.bodyOfKnowledgeId,
        questionToDelete.questionId).subscribe({
        next: () => this.onDeleteComplete(questionToDelete),
        error: err => throwError(err)
      });
    }
  }

  onDeleteComplete(deletedSubject: Questions): void {
    const index =  this.questionsResolvedData$.value.questions.findIndex(s => s.bodyOfKnowledgeId === deletedSubject.bodyOfKnowledgeId);
    if (index) {
      const questionsCopy = JSON.parse(JSON.stringify(this.questionsResolvedData$.value.questions));
      questionsCopy.splice(+index, 1);
      const reccount = questionsCopy.length;
      this.questionsResolvedData$.next({questions: questionsCopy, count: reccount});
      this.searchQuestions$.next();
    }
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): QuestionsResolved | Observable<QuestionsResolved> | Promise<QuestionsResolved> {
    console.log("Questions Resolver");
    console.log(JSON.stringify(state.url.split('/')));
    const thisBodyOfKnowledgeId = state.url.split('/')[2];

    let BodyOfKnowledgeId: number;
    if (thisBodyOfKnowledgeId === null) {
      const message = `Subject id not found`;
      console.error(message);
      return of({ questions: null, count: 0, error: message });
    } else {
      if (isNaN(+thisBodyOfKnowledgeId)) {
        const message = `Subject id not a number: ${thisBodyOfKnowledgeId}`;
        console.error(message);
        return of({ questions: null, count: 0, error: message });
      }
      BodyOfKnowledgeId = +thisBodyOfKnowledgeId;
    }

    console.log(`Questions Resolver BodyOfKnowledgeId:  ${BodyOfKnowledgeId}`);
    return this.questionsService.getQuestionsBySubject(BodyOfKnowledgeId)
    .pipe(
      map(sub => ({ questions: sub, count: sub.length,  error: '' })),
      catchError(error => {
        const message = `Retrieval error: ${error}`;
        console.log(message);
        return of({ questions: null, count: 0, error: message });
      }),
    );
  }
}
