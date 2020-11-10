import { Component } from '@angular/core';
import { BlobUploadsViewStateService } from '../services/blob-uploads-view-state.service';

@Component({
  selector: 'mls-items-uploaded',
  template: `
    <h3>Uploads</h3>
    <!-- <ng-container *ngFor="let upload of uploads$ | async">
      <pre>{{ upload | json }}</pre>
    </ng-container> -->
    <!-- <div class="p-2 flex-grow-1"  *ngFor="let progress of uploads$ | async">
      <ngb-progressbar type="light" height = '30px'
      [value]="progress.progress"
      [striped]="true"
      [animated]="true"
      [showValue]="true"></ngb-progressbar>
    </div> -->
  `
})
export class ItemsUploadedComponent {
  uploads$ = this.blobState.uploadedItems$;
  constructor(private blobState: BlobUploadsViewStateService) {}
}
