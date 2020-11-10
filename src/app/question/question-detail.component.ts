import { Component, OnInit } from '@angular/core';
import { Questions, QuestionResolved } from '../shared/models/questions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mls-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css'],
})
export class QuestionDetailComponent implements OnInit {

  pageTitle = 'Question Detail';
  question: Questions;
  errorMessage: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
      const resolvedData: QuestionResolved =
      this.route.snapshot.data.resolvedData;
      this.errorMessage = resolvedData.error;
      this.onQuestionRetrieved(resolvedData.question);
  }

  onQuestionRetrieved(question: Questions): void {
    this.question = question;
    if (this.question) {
      this.pageTitle = `Question Detail: ${this.question.question}`;
    } else {
      this.pageTitle = 'No question found';
    }
  }
}


