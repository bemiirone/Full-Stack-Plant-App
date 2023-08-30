import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {

  @Input() totalItems = 0;
  @Input() itemsPerPage = 10;
  @Input() currentPage = 1;
  @Output() pageChange = new EventEmitter<number>();
  @Output() nextPage = new EventEmitter<void>();
  @Output() prevPage = new EventEmitter<void>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  isLastPage(): boolean {
    return this.totalItems < this.itemsPerPage
  }

  onNextPage(): void {
    this.currentPage++;
    this.nextPage.emit();
  }

  onPrevPage(): void {
    this.currentPage--;
    this.prevPage.emit();
  }
}
