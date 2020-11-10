import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFileComponent } from './input-file.component';
import { InputFileDirective } from './input-file.directive';

@NgModule({
  declarations: [InputFileComponent, InputFileDirective],
  imports: [
    CommonModule,
  ],
  exports: [InputFileComponent]
})
export class InputFileModule { }
