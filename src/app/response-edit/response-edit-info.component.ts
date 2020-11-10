import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Responses } from '../shared/models/response';

@Component({
  selector: 'mls-response-edit-info',
  templateUrl: './response-edit-info.component.html',
  styleUrls: ['./response-edit-info.component.css']
})
export class ResponseEditInfoComponent implements OnInit {


  @ViewChild(NgForm) responseInfoForm: NgForm;
  errorMessage: string;
  response: Responses;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.parent.data.subscribe(data => {
      if (this.responseInfoForm) {
        this.responseInfoForm.reset();
      }

      this.response = data.resolvedData.response;
    });
  }

}
