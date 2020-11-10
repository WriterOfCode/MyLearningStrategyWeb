import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Questions } from '../shared/models/questions';

@Component({
  selector: 'mls-question-edit-info',
  templateUrl: './question-edit-info.component.html',
  styleUrls: ['./question-edit-info.component.css']
})
export class QuestionEditInfoComponent implements OnInit {

  @ViewChild(NgForm) questionInfoForm: NgForm;
  errorMessage: string;
  question: Questions;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.parent.data.subscribe(data => {
      if (this.questionInfoForm) {
        this.questionInfoForm.reset();
      }

      this.question = data.resolvedData.question;
    });
  }

}
