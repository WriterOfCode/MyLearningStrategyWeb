import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, SubjectResolved } from '../shared/models/subjects';
import { Category } from '../shared/models/category';
import { CategoriesService } from '../shared/services/categories.service';

@Component({
  selector: 'mls-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.css']
})
export class SubjectDetailComponent implements OnInit {
  pageTitle = 'Subject Detail';
  subject: Subject;
  errorMessage: string;
  categoriesList: Category[];

  constructor(private route: ActivatedRoute,  private categoriesService: CategoriesService) { }

  ngOnInit() {
      const resolvedData: SubjectResolved = this.route.snapshot.data.resolvedData;
      this.categoriesService.getCategories()
      .subscribe(categories => (this.categoriesList = categories));
      this.errorMessage = resolvedData.error;
      this.onSubjectRetrieved(resolvedData.subject);
  }

  onSubjectRetrieved(subject: Subject): void {
    this.subject = subject;
    if (this.subject) {
      this.pageTitle = `Subject Detail: ${this.subject.name}`;
    } else {
      this.pageTitle = 'No subject found';
    }
  }
}
