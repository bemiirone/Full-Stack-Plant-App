import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-plant-filter',
  templateUrl: './plant-filter.component.html',
  styleUrls: ['./plant-filter.component.scss']
})
export class PlantFilterComponent {
  filter = '';
  @Output() filterChange = new EventEmitter<string>();

  onFilterChange(): void {
    this.filterChange.emit(this.filter);
  }
}
