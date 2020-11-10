import { Component, ViewChild, Output, EventEmitter, HostListener, Injector, Input, forwardRef } from '@angular/core';
import {ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, FormControlDirective} from '@angular/forms';
import { InputFileDirective } from './input-file.directive';

@Component({
  selector: 'mls-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: [ './input-file.component.css' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFileComponent),
      multi: true
    }
  ],
    // tslint:disable-next-line: no-host-metadata-property
    host: {
    '(change)': 'onChange($event.target.value)',
    '(input)': 'onChange($event.target.value)',
    '(blur)': 'onTouched()',
    }
})
export class InputFileComponent implements ControlValueAccessor {

  get control() {
    return this.formControl || this.control.get(this.formControlName);
  }


  get value(): FileList {
   return this.selectedFiles;
  }
  set value(val: FileList){
    if ( val !== undefined && this.selectedFiles !== val){
    this.selectedFiles = val;
    this.onChange(val);
    this.onTouched(val);
    }
  }

  constructor(private injector: Injector) {  }

  get controlContainer() {
    return this.injector.get(ControlContainer);
  }
  @ViewChild(FormControlDirective, {static: true})

  formControlDirective: FormControlDirective;
  @Input() formControl: FormControl;
  @Input() formControlName: string;
  @Input() buttonText = "Select File";
  @Input() disabled = false;

  @Output()
  alowMultiple = false;
  selectedFiles: FileList;
  selectedFile: File;
  selectedFileName: string;

  @Output()
  selectedFilesChanged = new EventEmitter<FileList>();

  @ViewChild('buttonPicker', { static: true })
  buttonPickerVar: InputFileDirective;

  @ViewChild('resetFilePickerControl', { static: true })
  reset: InputFileDirective;

  // Function to call when the rating changes.
  onChange = (files: FileList) => {};
  // Function to call when the input is touched (when a star is clicked).
  onTouched: any = () => {};

  clearInput() {
    this.control.setValue(undefined);
  }

  // Allows Angular to update the model (rating).
  // Update the model and changes needed for the view here.
  writeValue(files: FileList): void {
    this.selectedFiles = files;
  }
  // Allows Angular to register a function to call when the model (rating) changes.
  // Save the function as a property to call later here.
  registerOnChange(fn: (files: FileList) => void): void {
    this.onChange = fn;
  }
  // Allows Angular to register a function to call when the input has been touched.
  // Save the function as a property to call later here.
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  // Allows Angular to disable the input.
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  _onFilesChanged(files: FileList) {
    try{
      console.log("InputFileComponent._onFilesChanged");
      this.selectedFiles = files;
      this.selectedFile = files[0];
      this.selectedFileName = files[0].name;
      this.onChange(files);
      this.onTouched(files);
      this.selectedFilesChanged.emit(files);
    } catch (e)
    {
      console.log("No File Selected. Reset Called on file change");
      this._onReset();
      this._reset();
    }
  }

  _onReset() {
    console.log("_onReset");
    this.selectedFiles = null;
    this.selectedFile = null;
    this.selectedFileName = '';
  }

  _reset() {
    console.log("_reset");
    this.buttonPickerVar.reset();
  }
}
