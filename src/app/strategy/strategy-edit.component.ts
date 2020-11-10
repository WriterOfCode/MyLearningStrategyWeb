import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Strategy } from '../shared/models/strategy';
import { PickListsService } from '../shared/services/pick-lists.service';
import { PickList } from '../shared/models/pick-list';
import { Router } from '@angular/router';
import { AlertsService } from '../shared/alerts.service';
import { AuthService } from '../shared/auth/auth.service';
/* NgRx */
import { Store } from '@ngrx/store';
import { getCurrentStrategy, State } from './state/strategy.selectors';
import { StrategyPageActions } from './state/actions/strategy-actions-index';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'mls-stategy-edit',
  templateUrl: './strategy-edit.component.html',
  styleUrls: ['./strategy-edit.component.css']
})
export class StrategyEditComponent implements OnInit {
  @ViewChild(NgForm) strategyEditForm: NgForm;
  pageTitle = 'Edit';
  errorMessage: string;
  private originalStrategy: Strategy;
  currentStrategy: Strategy;
  strategy$: Observable<Strategy | null>;
  questionSortRules: PickList[];
  questionSelections: PickList[];
  responseSelections: PickList[];

  get isDirty(): boolean {
    return JSON.stringify(this.originalStrategy) !== JSON.stringify(this.currentStrategy);
  }

  get isValid(): boolean {
    return true;
  }

  constructor(private user: AuthService,
              private pickLists: PickListsService,
              private store: Store<State>,
              private router: Router,
              private alertsService: AlertsService) { }

  ngOnInit() {
    this.store.select(getCurrentStrategy)
      .subscribe(data => this.originalStrategy = data);

    this.currentStrategy = JSON.parse(JSON.stringify(this.originalStrategy));
    this.pickLists.getQuestionSortRules()
    .subscribe(data => (this.questionSortRules = data));

    this.pickLists.getQuestionSelection()
    .subscribe(data => (this.questionSelections = data));

    this.pickLists.getResponseSelection()
    .subscribe(data => (this.responseSelections = data));

    if (!this.currentStrategy) {
      this.pageTitle = 'Strategy not found';
    } else {
      if (this.currentStrategy.strategyId === 0) {
        this.pageTitle = 'Add Strategy';
      } else {
        this.pageTitle = `Edit Strategy:`;
      }
    }
  }


  deleteStrategy(): void {
    if (this.currentStrategy && this.currentStrategy.strategyId !== 0){
      if (confirm(`Do you realy want to detete the Strategy:  ${this.currentStrategy.name}?`)) {
        this.store.dispatch(StrategyPageActions.deleteStrategy({strategyId: this.currentStrategy.strategyId}));
        this.alertsService.add('success', 'Strategy', `${this.currentStrategy.name} was deleted`);
        // Navigate back to the strategies list
        this.router.navigate(['/strategies']);
      }
    } else {
      // No need to delete, it was never saved
      this.store.dispatch(StrategyPageActions.clearCurrentStrategy());
      this.alertsService.add('success', 'Strategy', `${this.currentStrategy.name} was deleted`);
      // Navigate back to the strategies list
      this.router.navigate(['/strategies']);
    }
  }

  saveStrategy(): void {
    if (this.isDirty) {
      // Copy over all of the original product properties
      // Then copy over the values from the form
      // This ensures values not on the form, such as the Id, are retained
      const newStrategy = { ...this.originalStrategy, ...this.currentStrategy };
      if (newStrategy.strategyId === 0) {
        newStrategy.originator = this.user.userProfile.originator;
        newStrategy.userProfileId = this.user.userProfile.userProfileId;
        this.store.dispatch(StrategyPageActions.createStrategy({ strategy: newStrategy }));
        this.alertsService.add('success', 'Strategy', `The new ${this.currentStrategy.name} was saved`);
        // Navigate back to the strategies list
        this.router.navigate(['/strategies']);
      } else {
        this.store.dispatch(StrategyPageActions.updateStrategy({ strategy: newStrategy }));
        this.alertsService.add('success', 'Strategy', `The updated ${this.currentStrategy.name} was saved`);
        // Navigate back to the strategies list
        this.router.navigate(['/strategies']);
      }
    }
  }
}
