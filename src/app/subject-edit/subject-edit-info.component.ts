import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subject } from '../shared/models/subjects';


@Component({
  selector: 'mls-subject-edit-info',
  templateUrl: './subject-edit-info.component.html',
  styleUrls: ['./subject-edit-info.component.css']
})
export class SubjectEditInfoComponent implements OnInit {
  @ViewChild(NgForm) subjectInfoForm: NgForm;
  errorMessage: string;
  subject: Subject;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.parent.data.subscribe(data => {
      if (this.subjectInfoForm) {
        this.subjectInfoForm.reset();
      }
      this.subject = data.resolvedData.subject;
    });
  }
}
