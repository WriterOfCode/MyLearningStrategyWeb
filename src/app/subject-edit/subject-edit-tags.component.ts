import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subject } from '../shared/models/subjects';
import { Category } from '../shared/models/category';
import { Key } from '../shared/models/key';
import { CategoriesService } from '../shared/services/categories.service';
import { faTimesCircle  } from '@fortawesome/free-solid-svg-icons';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'mls-subject-edit-tags',
  templateUrl: './subject-edit-tags.component.html',
  styleUrls: ['./subject-edit-tags.component.css'],
  providers: [ CategoriesService ]
})
export class SubjectEditTagsComponent implements OnInit {
  @ViewChild(NgForm) subjectTagsForm: NgForm;
  errorMessage: string;
  subject: Subject;
  categoriesList: Category[];
  circleIcon = faTimesCircle;
  newTags = '';
  tags: string[];
  keys: Key[];

  constructor(private route: ActivatedRoute,
              private categoriesService: CategoriesService, ) { }

    ngOnInit(): void {
      this.categoriesService.getCategories()
          .subscribe(categories => (this.categoriesList = categories));

      this.route.parent.data.subscribe(data => {
        if (this.subjectTagsForm) {
          this.subjectTagsForm.reset();
        }
        this.subject = data.resolvedData.subject;
        this.tags = this.subject.keywords.split(',');
      });
    }

    // // Add the defined tags
    addTags(): void {
      if (!this.newTags) {
        this.errorMessage = 'Enter the search keywords separated by commas and then press Add';
      } else {
        const tagArray = this.newTags.split(',');
        this.tags = this.tags ? this.tags.concat(tagArray) : tagArray;
        this.newTags = '';
        this.errorMessage = '';
        this.subject.keywords = this.tags.toLocaleString();
      }
    }

    // Remove the tag from the array of tags.
    removeTag(idx: number): void {
      this.tags.splice(idx, 1);
      this.subject.keywords = this.tags.toLocaleString();
    }



  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.keys.push({ keyword: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(key: Key): void {
    const index = this.keys.indexOf(key);

    if (index >= 0) {
      this.keys.splice(index, 1);
    }
  }
}
