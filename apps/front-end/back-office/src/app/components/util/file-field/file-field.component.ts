import { Component, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'webonjour-file-field',
  templateUrl: './file-field.component.html',
  styleUrls: ['./file-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileFieldComponent), // replace name as appropriate
      multi: true,
    },
  ],
})
export class FileFieldComponent implements ControlValueAccessor {
  private file: File | null = null;
  onChange!: (file: File | null) => void;
  onTouch!: () => void;
  fileUrl = 'https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg';

  constructor(private host: ElementRef<HTMLInputElement>) {}

  writeValue(file: File | string) {
    if (file instanceof File) {
      this.file = file;
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target) {
          this.fileUrl = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    } else {
      this.fileUrl = file;
    }
    if (file === null) {
      this.host.nativeElement.value = '';
      this.fileUrl =
        'https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg';
    }
  }

  // upon UI element value changes, this method gets triggered
  registerOnChange(fn: () => void) {
    this.onChange = fn;
  }

  // upon touching the element, this method gets triggered
  registerOnTouched(fn: () => void) {
    this.onTouch = fn;
  }

  onFileSelected($event: Event) {
    const file = ($event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.writeValue(file);
      this.onChange(file);
    }
  }
}
