import { Component, EventEmitter, Output } from '@angular/core';

export type filters = {
  username: string;
  status: string;
};
@Component({
  selector: 'app-filters-users',
  imports: [],
  templateUrl: './filters-users.component.html',
  styleUrl: './filters-users.component.css'
})
export class FiltersUsersComponent {
  @Output() onFilterChange = new EventEmitter<filters>();

  activeFilters: filters = {
    username: '',
    status: 'all',
  };
  onNameChange($event: any) {
    this.activeFilters.username = $event.target.value;
    this.onFilterChange.emit(this.activeFilters);
  }
}
