import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subject } from '../shared/models/subjects';


@Component({
  selector: 'mls-subject-edit-image',
  templateUrl: './subject-edit-image.component.html',
  styleUrls: ['./subject-edit-image.component.css']
})
export class SubjectEditImageComponent implements OnInit {
  subject: Subject;
  selectedFiles: FileList;
  selectedFile: File;
  selectedFileName: string;
  imageSrc: any;
  alowMultiple = false;

  @ViewChild(NgForm) subjectImageForm: NgForm;
  constructor(private route: ActivatedRoute) { }

ngOnInit(): void {
    this.route.parent.data.subscribe(data => {
      if (this.subjectImageForm) {
        this.subjectImageForm.reset();
      }
      this.subject = data.resolvedData.subject;
      this.imageSrc = this.subject.imageCloud;
    });
  }

_onFilesChanged(files: FileList) {
    this.selectedFiles = files;

    if (!this.alowMultiple) {
      this.selectedFile = this.selectedFiles[0];
      this.selectedFileName = this.selectedFile.name;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile); // read file as data url
    }
  }

// _onReset() {
//     this.selectedFiles = undefined;
//   }

// _reset() {
//     this.buttonPicker.reset();
//   }

}
