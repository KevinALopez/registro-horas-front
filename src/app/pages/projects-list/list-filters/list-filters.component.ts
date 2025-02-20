import { Component, EventEmitter, Output } from '@angular/core';

type states = {
  name: string;
  value: string;
};

export type filters = {
  name: string;
  status: string;
};

@Component({
  selector: 'app-list-filters',
  imports: [],
  templateUrl: './list-filters.component.html',
  styleUrl: './list-filters.component.css',
})
export class ListFiltersComponent {
  @Output() onFilterChange = new EventEmitter<filters>();

  states: states[] = [
    {
      name: 'Terminados',
      value: 'finish',
    },
    {
      name: 'Activos',
      value: 'active',
    },
    {
      name: 'Cancelados',
      value: 'cancel',
    },
  ];

  activeFilters: filters = {
    name: '',
    status: 'all',
  };

  onStatusChange($event: any) {
    this.activeFilters.status = $event.target.value;
    this.onFilterChange.emit(this.activeFilters);
  }

  onNameChange($event: any) {
    this.activeFilters.name = $event.target.value;
    this.onFilterChange.emit(this.activeFilters);
  }
}
