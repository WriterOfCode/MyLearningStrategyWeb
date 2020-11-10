import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from '../shared/alerts.service';
import { Subject, SubjectResolved } from '../shared/models/subjects';
import { SubjectService } from '../shared/services/subject.service';
import { faExclamation, faExclamationTriangle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { StrategiesService } from '../shared/services/strategies.service';

@Component({
  selector: 'mls-subject-edit',
  templateUrl: './subject-edit.component.html',
  styleUrls: ['./subject-edit.component.css']
})
export class SubjectEditComponent implements OnInit {
  pageTitle = 'Edit';
  errorMessage: string;
  private dataIsValid: { [key: string]: boolean } = {};
  private currentSubject: Subject;
  private originalSubject: Subject;
  exclamationIcon = faExclamation;
  exclamationTriangelIcon = faExclamationTriangle;
  exclamatinoCircle = faExclamationCircle;

  get isDirty(): boolean {
    return JSON.stringify(this.originalSubject) !== JSON.stringify(this.currentSubject);
  }

  get isTouched(): boolean {
    return JSON.stringify(this.originalSubject) !== JSON.stringify(this.currentSubject);
  }

  get subject(): Subject {
    return this.currentSubject;
  }

  set subject(value: Subject) {
    this.currentSubject = value;
    // Clone the object to retain a copy
    this.originalSubject = value ? { ...value } : null;
  }

  constructor(private subjectService: SubjectService,
              private str: StrategiesService,
              private route: ActivatedRoute,
              private router: Router,
              private alertsService: AlertsService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      const resolvedData: SubjectResolved =
      this.route.snapshot.data.resolvedData;
      this.errorMessage = resolvedData.error;
      this.onSubjectRetrieved(resolvedData.subject);
    });
  }

  onSubjectRetrieved(subject: Subject): void {
    this.subject = subject;
    if (!this.errorHandler) {
      this.alertsService.add('warning', 'Could not retrive subject', this.errorMessage);
    }
    if (!this.subject) {
      this.pageTitle = 'Subject not found';
    } else {
      if (this.subject.bodyOfKnowledgeId === 0) {
        this.pageTitle = 'Add Subject';
      } else {
        this.pageTitle = `Edit Subject:  ${this.subject.name}`;
      }
    }
  }

  deleteProduct(): void {
    if (this.subject.bodyOfKnowledgeId === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete(`${this.subject.name} was deleted`);
    } else {
      if (confirm(`Really delete the subject: ${this.subject.name}?`)) {
        console.log(JSON.stringify(this.subject));
        this.subjectService.deleteSubject(this.subject.bodyOfKnowledgeId).subscribe({
          next: () => this.onSaveComplete(`${this.subject.name} was deleted`),
          error: err =>  this.errorHandler(err)
        });
      }
    }
  }

  onSaveComplete(message?: string): void {
    this.alertsService.add('success', 'Saved Subject', message);
    // Navigate back to the subjects list
    this.router.navigate(['/subjects']);
  }

  saveProduct(): void {
    console.log(JSON.stringify(this.subject));
    if (this.isValid()) {
      if (this.subject.bodyOfKnowledgeId === 0) {
        this.str.addSubject(this.subject).subscribe({
          next: () => this.onSaveComplete(`The new ${this.subject.name} was saved`),
          error: err =>  this.errorHandler(err)
        });
      } else {
        this.str.updateSubject(this.subject).subscribe({
          next: () => this.onSaveComplete(`The updated ${this.subject.name} was saved`),
          error: err => this.errorHandler(err)
        });
      }
    } else {
      this.errorHandler( 'Please correct the validation errors.');
    }


    // if (this.isValid()) {
    //   if (this.subject.bodyOfKnowledgeId === 0) {
    //     this.subjectService.addSubject(this.subject).subscribe({
    //       next: () => this.onSaveComplete(`The new ${this.subject.name} was saved`),
    //       error: err =>  this.errorHandler(err)
    //     });
    //   } else {
    //     this.subjectService.updateSubject(this.subject).subscribe({
    //       next: () => this.onSaveComplete(`The updated ${this.subject.name} was saved`),
    //       error: err => this.errorHandler(err)
    //     });
    //   }
    // } else {
    //   this.errorHandler( 'Please correct the validation errors.');
    // }
  }

  errorHandler(errorMessage: any) {
    this.alertsService.add('warning', 'Could  save Subject', this.errorMessage);
  }


  reset(): void {
    this.dataIsValid = null;
    this.currentSubject = null;
    this.originalSubject = null;
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
    // Clear the validation object
    this.dataIsValid = {};


    // 'info' tab
    if (this.subject === null || this.subject.name === null )
    { this.dataIsValid.info = false; }
    else if (this.subject.name &&
      this.subject.name.length >= 3 &&
      this.subject.name.length <= 50 &&
      this.subject.description.length <= 255) {
      this.dataIsValid.info = true;
    } else {
      this.dataIsValid.info = false;
    }
    this.dataIsValid.image = true;
    // 'tags' tab
    this.dataIsValid.tags = true;
    // 'questions' tab
    this.dataIsValid.questions = true;
  }
}
