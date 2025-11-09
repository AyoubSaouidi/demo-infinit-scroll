import { Component, OnDestroy, OnInit } from '@angular/core';
import { IScrollListItem } from './demo/entities/interfaces/scroll-item.interface';
import { MockDataService } from './demo/services/mock-data.service';
import { IMockDataItem, IPaginatedData } from './demo/entities/interfaces/mock-data.interface';
import { debounceTime, finalize, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private _unsub$: Subject<void> = new Subject();

  items: IScrollListItem[] = [];
  data: IPaginatedData<IMockDataItem> = {
    docs: [],
    meta: {
      page: 1,
      limit: 3,
      count: 0,
      total: 0,
      totalPages: 1,
      next: undefined,
      previous: undefined
    }
  };
  isLoading: boolean = false;

  constructor(
    private _mockDataService: MockDataService
  ) {}

  //#region Lifecycle
  ngOnInit(): void {
    this.fetchPage(this.data.meta.page);
  }

  ngOnDestroy(): void {
    this._unsub$.next();
    this._unsub$.complete();
  }
  //#endregion

  //#region Mock Pagination Simulation
  mapMockItemToScrollListItem(items: IMockDataItem[]): IScrollListItem[] {
    if(!items) return [];

    return items.map(item => ({label: item.id, value: item.name}));
  }

  fetchPage(page: number) {
    if(page < 1) return;

    this.isLoading = true;
    this._mockDataService.getPage({page, limit: this.data.meta.limit})
    .pipe(
      takeUntil(this._unsub$),
      debounceTime(3000),
      finalize(() => this.isLoading = false)
    )
    .subscribe(response => {
      if(!response) return;

      this.data = {...response};

      const newItems = this.mapMockItemToScrollListItem(response.docs);
      this.items = [...this.items, ...newItems];
    })
  }

  fetchNextPage() {
    if(!this.data.meta.next) return;

    this.fetchPage(this.data.meta.next);
  }
  //#endregion
}
