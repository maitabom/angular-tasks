import { Component, signal } from '@angular/core';
import Swal from 'sweetalert2';
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { ListItems } from '../../interfaces/listitens.interface';
import { InputListItemComponent } from '../../components/input-list-item/input-list-item.component';
import { LocalStorage } from '../../enums/localstorage.enum';

type ItemCheckbox = { checked: boolean; id: string };
type ItemText = { id: string; value: string };

@Component({
  selector: 'app-list',
  imports: [InputAddItemComponent, InputListItemComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  public addItem = signal(true);

  #refreshStorage = () =>
    localStorage.setItem(
      LocalStorage.MY_LIST,
      JSON.stringify(this.#setListItems())
    );

  #setListItems = signal<ListItems[]>(this.#parseItems());
  public getListItems = this.#setListItems.asReadonly();

  #parseItems() {
    return JSON.parse(localStorage.getItem(LocalStorage.MY_LIST) || '[]');
  }

  public getInputAddItem(value: ListItems) {
    localStorage.setItem(
      LocalStorage.MY_LIST,
      JSON.stringify([...this.#setListItems(), value])
    );

    return this.#setListItems.set(this.#parseItems());
  }

  public deleteAllItems() {
    Swal.fire({
      title: 'Tem certeza',
      text: 'Você não poderá reverter isso',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, delete tudo',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem(LocalStorage.MY_LIST);
        return this.#setListItems.set(this.#parseItems());
      }
    });
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

      return oldValue;
    });

    return this.#refreshStorage();
  }

  public updateItemText(item: ItemText) {
    this.#setListItems.update((oldValue: ListItems[]) => {
      oldValue.filter((resource) => {
        if (resource.id === item.id) {
          resource.value = item.value;
          return resource;
        }

        return resource;
      });

      return oldValue;
    });

    return this.#refreshStorage();
  }

  public deleteItem(id: string) {
    this.#setListItems.update((oldValue: ListItems[]) => {
      return oldValue.filter((resource) => resource.id !== id);
    });

    return this.#refreshStorage();
  }
}
