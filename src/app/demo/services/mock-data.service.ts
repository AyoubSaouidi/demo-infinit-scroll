import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { IMockDataItem, IPaginatedData } from '../entities/interfaces/mock-data.interface';

export interface IPaginationOptions {
  page: number;
  limit: number;
}

@Injectable()
export class MockDataService {
  private _mock: IMockDataItem[] = [
    {
      id: '1',
      name: '1st Item',
      description: "This is the first mock data item"
    },
    {
      id: '2',
      name: '2nd Item',
      description: undefined
    },
    {
      id: '3',
      name: '3rd Item',
      description: undefined
    },
    {
      id: '4',
      name: '4th Item',
      description: "This is the fourth mock data item"
    },
    {
      id: '5',
      name: '5th Item',
      description: undefined
    },
    {
      id: '6',
      name: '6th Item',
      description: undefined
    },
    {
      id: '7',
      name: '7th Item',
      description: undefined
    },
    {
      id: '8',
      name: '8th Item',
      description: undefined
    },
    {
      id: '9',
      name: '9th Item',
      description: undefined
    },
    {
      id: '10',
      name: '10(...) Item',
      description: undefined
    },
  ]

  constructor() { }

  getPage(options: IPaginationOptions = {page: 1, limit: 2}): Observable<IPaginatedData<IMockDataItem>> {
    const totalPages = Math.ceil(this._mock.length / options.limit);
    const startIndex = (options.page - 1) * options.limit;
    const endIndex = startIndex + options.limit;
    const docs = this._mock.slice(startIndex, endIndex);

    const repsonse: IPaginatedData<IMockDataItem> = {
      docs,
      meta: {
        page: options.page,
        limit: options.limit,
        count: docs.length,
        total: this._mock.length,
        totalPages,
        next: options.page < totalPages ? options.page + 1 : undefined,
        previous: options.page > 0 ? options.page - 1 : undefined
      }
    }
    return of(repsonse).pipe(delay(1000));
  }
}
