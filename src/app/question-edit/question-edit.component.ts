import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from '../shared/alerts.service';
import { Questions, QuestionResolved } from '../shared/models/questions';
import { QuestionService } from '../shared/services/question.service';

@Component({
  selector: 'mls-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit {

  pageTitle = 'Edit';
  errorMessage: string;
  showEditButtons: true;

  private dataIsValid: { [key: string]: boolean } = {};
  currentQuestion: Questions;
  private originalQuestion: Questions;

  get isDirty(): boolean {
    return JSON.stringify(this.originalQuestion) !== JSON.stringify(this.currentQuestion);
  }

  get question(): Questions {
    return this.currentQuestion;
  }

  set question(value: Questions) {
    this.currentQuestion = value;
    // Clone the object to retain a copy
    this.originalQuestion = value ? { ...value } : null;
  }

             // private messageService: MessageService,
  constructor(private questionService: QuestionService,
              private route: ActivatedRoute,
              private router: Router,
              private alertsService: AlertsService) { }


  ngOnInit() {
    const resolvedData: QuestionResolved =
    this.route.snapshot.data.resolvedData;
    this.errorMessage = resolvedData.error;
    this.onSubjectRetrieved(resolvedData.question);
  }

  onSubjectRetrieved(subject: Questions): void {
    this.question = subject;
    if (!this.question) {
      this.pageTitle = 'Subject not found';
    } else {
      if (this.question.bodyOfKnowledgeId === 0) {
        this.pageTitle = 'Add Subject';
      } else {
        this.pageTitle = `Edit Subject:  ${this.question.question}`;
      }
    }
  }

  deleteQuestion(): void {
    if (this.question.bodyOfKnowledgeId === 0) {
      this.onSaveComplete(`${this.question.question} was deleted`);
    } else {
      if (confirm(`Really delete the product: ${this.question.question}?`)) {
        this.questionService.deleteQuestion(this.question.bodyOfKnowledgeId,
          this.question.questionId).subscribe({
          next: () => this.onSaveComplete(`${this.question.question} was deleted`),
          error: err =>  this.errorHandler(err)
        });
      }
    }
  }

  onSaveComplete(message?: string): void {
    this.alertsService.add('success', 'Saved Subject', message);
    this.reset();
    this.router.navigate(['/subjects']);
  }

  saveQuestion(): void {
    if (this.isValid()) {
      if (this.question.questionId === 0) {
        this.questionService.addQuestion(this.question).subscribe({
          next: () => this.onSaveComplete(`The new ${this.question.question} was saved`),
          error: err =>  this.errorHandler(err)
        });
      } else {
        this.questionService.updateQuestion(this.question).subscribe({
          next: () => this.onSaveComplete(`The updated ${this.question.question} was saved`),
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
    this.currentQuestion = null;
    this.originalQuestion = null;
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
    if (this.question.question &&
      this.question.question.length >= 1 &&
      this.question.question.length <= 50) {
      this.dataIsValid.info = true;
    } else {
      this.dataIsValid.info = false;
    }

    // 'tags' tab
    this.dataIsValid.tags = true;
    // image tab
    this.dataIsValid.image = true;
    // responses tab
    this.dataIsValid.responses = true;
  }

}
