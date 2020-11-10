import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from '../shared/alerts.service';
import { Responses, ResponseResolved } from '../shared/models/response';
import { ResponsesService } from '../shared/services/responses.service';

@Component({
  selector: 'mls-response-edit',
  templateUrl: './response-edit.component.html',
  styleUrls: ['./response-edit.component.css']
})
export class ResponseEditComponent implements OnInit {


  pageTitle = 'Edit';
  errorMessage: string;
  showEditButtons: true;

  private dataIsValid: { [key: string]: boolean } = {};
  currentResponse: Responses;
  private originalResponse: Responses;

  get isDirty(): boolean {
    return JSON.stringify(this.originalResponse) !== JSON.stringify(this.currentResponse);
  }

  get response(): Responses {
    return this.currentResponse;
  }

  set response(value: Responses) {
    this.currentResponse = value;
    // Clone the object to retain a copy
    this.originalResponse = value ? { ...value } : null;
  }

             // private messageService: MessageService,
  constructor(private responseService: ResponsesService,
              private route: ActivatedRoute,
              private router: Router,
              private alertsService: AlertsService) { }


  ngOnInit() {
    const resolvedData: ResponseResolved =
    this.route.snapshot.data.resolvedData;
    this.errorMessage = resolvedData.error;
    this.onResponseRetrieved(resolvedData.response);
  }

  onResponseRetrieved(subject: Responses): void {
    this.response = subject;
    if (!this.response) {
      this.pageTitle = 'Response not found';
    } else {
      if (this.response.responseId === 0) {
        this.pageTitle = 'Add Respons';
      } else {
        this.pageTitle = `Edit Response:  ${this.response.response}`;
      }
    }
  }

  deleteResponse(): void {
    if (this.response.responseId === 0) {
      this.onSaveComplete(`${this.response.response} was deleted`);
    } else {
      if (confirm(`Really delete the response: ${this.response.response}?`)) {
        this.responseService.deleteAResponse(this.response.questionId,
          this.response.responseId).subscribe({
          next: () => this.onSaveComplete(`${this.response.response} was deleted`),
          error: err =>  this.errorHandler(err)
        });
      }
    }
  }

  onSaveComplete(message?: string): void {
    this.alertsService.add('success', 'Saved response', message);
    this.reset();
    this.router.navigate([this.route.snapshot.parent]);
  }

  saveResponse(): void {
    if (this.isValid()) {
      if (this.response.responseId === 0) {
        this.responseService.addResponse(this.response).subscribe({
          next: () => this.onSaveComplete(`The new response ${this.response.response} was saved`),
          error: err =>  this.errorHandler(err)
        });
      } else {
        this.responseService.updateResponse(this.response).subscribe({
          next: () => this.onSaveComplete(`The updated response ${this.response.response} was saved`),
          error: err => this.errorHandler(err)
        });
      }
    } else {
      this.errorHandler( 'Please correct the validation errors.');
    }
  }

  errorHandler(errorMessage: any) {this.alertsService.add('warning', 'Save Subject', 'errorMessage');
  }

  reset(): void {
    this.dataIsValid = null;
    this.currentResponse = null;
    this.originalResponse = null;
  }

  isValid(path?: string): boolean {
    this.validate();
    if (path) {
      return this.dataIsValid[path];
    }
    return (this.dataIsValid &&
      Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));
  }

  validate(): void {
    this.dataIsValid = {};

    // 'info' tab
    if (this.response.response &&
      this.response.response.length >= 3 &&
      this.response.response.length <= 50) {
      this.dataIsValid.info = true;
    } else {
      this.dataIsValid.info = false;
    }

    // 'tags' tab
    this.dataIsValid.tags = true;
  }

}
