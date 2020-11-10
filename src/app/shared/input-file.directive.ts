import {
  Directive,
  HostListener,
  Output,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy,
  EventEmitter,
  Optional,
  Inject,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Directive({
  selector: '[mLSFilePickerSel]',
  exportAs: 'mLSFilePickerEx',
})
export class InputFileDirective implements OnDestroy, OnChanges {

  private inputFileForm: HTMLFormElement;
  // Allow multiple file selection. Defaults to `false`.
  @Input()
  set multiple(val: boolean) {
    this.multipleFiles = coerceBooleanProperty(val);
  }
  get multiple() {
    return this.multipleFiles;
  }
  private multipleFiles = false;

  // File list emitted on change.
  @Output()
  filesChanged = new EventEmitter<FileList>();

  // File list emitted on change.
  @Output()
  filesReset = new EventEmitter();

   // Selected Files
   get files(): FileList | undefined {
     return this.inputFileNativeFileElement.files;
   }

   // Native input[type=file] element.
  get nativeFileElement() {
    return this.inputFileNativeFileElement;
  }
  private inputFileNativeFileElement: HTMLInputElement;

  private inputFilesChanged = () => {
    this.filesChanged.emit(this.inputFileNativeFileElement.files);
  }

  constructor(
    @Optional() @Inject(DOCUMENT) private inputFileDoc: Document,
  ) {
    if (this.inputFileDoc) {
      this.inputFileForm = this.inputFileDoc.createElement('form');
      this.inputFileNativeFileElement = this.inputFileDoc.createElement('input');
      this.inputFileNativeFileElement.type = 'file';
      this.inputFileNativeFileElement.multiple = this.multiple;
      this.inputFileNativeFileElement.addEventListener('change', this.inputFilesChanged);
      this.inputFileForm.appendChild(this.nativeFileElement);
    }
  }

  // Invoke file browse on click.
  @HostListener('click', ['$event'])
  _onClick(event: Event) {
    event.preventDefault();
    this.inputFileNativeFileElement.click();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.multiple) {
      this.inputFileNativeFileElement.multiple = this.multiple;
    }
  }

  ngOnDestroy() {
    this.inputFileNativeFileElement.removeEventListener('change', this.inputFilesChanged);
    this.inputFileNativeFileElement.remove();
    this.inputFileForm.remove();
  }

  // Reset file list.
  reset() {
    this.inputFileForm.reset();
    this.filesReset.emit();
  }
}
