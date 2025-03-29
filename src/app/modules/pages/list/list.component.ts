import { Component, signal } from '@angular/core';
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { ListItems } from '../../interfaces/listitens.interface';

@Component({
  selector: 'app-list',
  imports: [InputAddItemComponent],
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
}
