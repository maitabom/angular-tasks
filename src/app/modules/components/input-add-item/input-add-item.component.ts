import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Output,
  ViewChild,
} from '@angular/core';
import { ListItems } from '../../interfaces/listitens.interface';

@Component({
  selector: 'app-input-add-item',
  imports: [],
  templateUrl: './input-add-item.component.html',
  styleUrl: './input-add-item.component.scss',
})
export class InputAddItemComponent {
  #cdr = inject(ChangeDetectorRef);

  @ViewChild('inputText')
  public inputText!: ElementRef;

  @Output()
  public outputAddListItems = new EventEmitter<ListItems>();

  public focusAndAddItem(value: string) {
    if (value) {
      const dateNow = new Date();
      const timeStamp = dateNow.getTime();
      const id = `id ${timeStamp}`;

      this.#cdr.detectChanges();
      this.inputText.nativeElement.value = '';
      this.outputAddListItems.emit({
        checked: false,
        value,
        id,
      });

      return this.inputText.nativeElement.focus();
    }
  }
}
