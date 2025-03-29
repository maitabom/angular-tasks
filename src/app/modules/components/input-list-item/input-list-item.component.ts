import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListItems } from '../../interfaces/listitens.interface';

type ItemCheckbox = { checked: boolean; id: string };

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

  public updateItemCheckbox(id: string, checked: boolean) {
    return this.outputUpdateItemCheckbox.emit({id, checked});
  }
}
