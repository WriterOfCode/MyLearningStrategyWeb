import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Responses } from '../shared/models/response';
@Component({
  selector: 'mls-response-edit-image',
  templateUrl: './response-edit-image.component.html',
  styleUrls: ['./response-edit-image.component.css']
})
export class ResponseEditImageComponent implements OnInit {

  @ViewChild(NgForm) responseImageForm: NgForm;
  errorMessage: string;
  response: Responses;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.parent.data.subscribe(data => {
      if (this.responseImageForm) {
        this.responseImageForm.reset();
      }

      this.response = data.resolvedData.response;
    });
  }
}
