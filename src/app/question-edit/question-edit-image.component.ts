import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Questions } from '../shared/models/questions';


@Component({
  selector: 'mls-question-edit-image',
  templateUrl: './question-edit-image.component.html',
  styleUrls: ['./question-edit-image.component.css']
})
export class QuestionEditImageComponent implements OnInit {

  @ViewChild(NgForm) questionImageForm: NgForm;
  errorMessage: string;
  question: Questions;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.parent.data.subscribe(data => {
      if (this.questionImageForm) {
        this.questionImageForm.reset();
      }

      this.question = data.resolvedData.question;
    });
  }
}
