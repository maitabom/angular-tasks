import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListItems } from '../../interfaces/listitens.interface';

type ItemCheckbox = { id: string; checked: boolean };
type ItemText = { id: string; value: string };

@Component({
  selector: 'app-input-list-item',
  imports: [],
  templateUrl: './input-list-item.component.html',
  styleUrl: './input-list-item.component.scss',
})
export class InputListItemComponent {
  @Input({ required: true })
  inputListItems: ListItems[] = [];

  @Output()
  public outputUpdateItemCheckbox = new EventEmitter<ItemCheckbox>();

  @Output()
  public outputUpdateItemText = new EventEmitter<ItemText>();

  public updateItemCheckbox(id: string, checked: boolean) {
    return this.outputUpdateItemCheckbox.emit({ id, checked });
  }

  public updateItemText(id: string, value: string) {
    return this.outputUpdateItemText.emit({ id, value });
  }
}
