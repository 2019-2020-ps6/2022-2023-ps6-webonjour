import { Component, ElementRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'webonjour-file-field',
  templateUrl: './file-field.component.html',
  styleUrls: ['./file-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileFieldComponent,
      multi: true,
    },
  ],
})
export class FileFieldComponent implements ControlValueAccessor {
  private file: File | null = null;
  onChange!: (file: File | null) => void;
  fileUrl = 'https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg';

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target) {
          this.fileUrl = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }
  constructor(private host: ElementRef<HTMLInputElement>) {
    this.onChange = () => {
      console.log('default onChange');
    };
  }

  writeValue() {
    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange(fn: (file: File | null) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: unknown) {
    console.log(fn);
  }
}
