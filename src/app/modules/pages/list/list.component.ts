import { Component, signal } from '@angular/core';
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { ListItems } from '../../interfaces/listitens.interface';
import { InputListItemComponent } from '../../components/input-list-item/input-list-item.component';

type ItemCheckbox = { checked: boolean; id: string };

@Component({
  selector: 'app-list',
  imports: [InputAddItemComponent, InputListItemComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  public addItem = signal(true);

  #setListItems = signal<ListItems[]>(this.#parseItems());
  public getListItems = this.#setListItems.asReadonly();

  #parseItems() {
    return JSON.parse(localStorage.getItem('@my-list') || '[]');
  }

  public getInputAddItem(value: ListItems) {
    localStorage.setItem(
      '@my-list',
      JSON.stringify([...this.#setListItems(), value])
    );

    return this.#setListItems.set(this.#parseItems());
  }

  public deleteAllItems() {
    localStorage.removeItem('@my-list');
    return this.#setListItems.set(this.#parseItems());
  }

  public listItemsStage(value: 'pending' | 'completed') {
    return this.getListItems().filter((resource: ListItems) => {
      if (value === 'pending') {
        return !resource.checked;
      }

      if (value === 'completed') {
        return resource.checked;
      }

      return resource;
    });
  }

  public updateItemCheckbox(item: ItemCheckbox) {
    this.#setListItems.update((oldValue: ListItems[]) => {
      oldValue.filter((resource) => {
        if (resource.id === item.id) {
          resource.checked = item.checked;
          return resource;
        }

        return resource;
      });

      return oldValue
    });

    return localStorage.setItem('@my-list', JSON.stringify(this.#setListItems()));
  }
}
