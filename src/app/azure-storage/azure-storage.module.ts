import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ContainerListComponent } from './components/container-list.component';
import { ItemsDeletedComponent } from './components/items-deleted.component';
import { ItemsDownloadedComponent } from './components/items-downloaded.component';
import { ItemsListComponent } from './components/items-list.component';
import { ItemsUploadedComponent } from './components/items-uploaded.component';
import { SelectedContainerComponent } from './components/selected-container.component';
import { azureBlobStorageFactory, BLOB_STORAGE_TOKEN } from './services/token';

@NgModule({
  imports: [ HttpClientModule],
  declarations: [
    ContainerListComponent,
    ItemsListComponent,
    SelectedContainerComponent,
    ItemsDownloadedComponent,
    ItemsUploadedComponent,
    ItemsDeletedComponent
  ],
  providers: [
    {
      provide: BLOB_STORAGE_TOKEN,
      useFactory: azureBlobStorageFactory
    }
  ],
  exports: [
    ContainerListComponent,
    ItemsListComponent,
    SelectedContainerComponent,
    ItemsDownloadedComponent,
    ItemsUploadedComponent,
    ItemsDeletedComponent
  ]
})
export class AzureStorageModule {}
