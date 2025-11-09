import { Component, Input, Output, EventEmitter, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { IScrollListItem } from '../../entities/interfaces/scroll-item.interface';
import { debounceTime, filter, fromEvent, map, Subject, takeUntil } from 'rxjs';
import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-scroll-list',
  templateUrl: './scroll-list.component.html',
  styleUrls: ['./scroll-list.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ScrollListComponent implements AfterViewInit, OnDestroy {
  private _unsub$: Subject<void> = new Subject();

  @Input() isLoading: boolean = false;
  @Input() items: IScrollListItem[] = [];
  @Output() reachedEnd: EventEmitter<void> = new EventEmitter();

  constructor(private _element: ElementRef) { }

  //#region Lifecycle
  ngAfterViewInit(): void {
    const container = this._element.nativeElement.querySelector('#scrollContainer');
    fromEvent(container, 'scroll')
      .pipe(
        debounceTime(220),
        map(() => container.scrollTop + container.clientHeight >= container.scrollHeight - 10),
        filter(atBottom => atBottom),
        takeUntil(this._unsub$)
      )
      .subscribe(() => {
        this.reachedEnd.emit();
      });
  }

  ngOnDestroy(): void {
    this._unsub$.next();
    this._unsub$.complete();
  }
  //#endregion

  // handleScroll(event: Event): void {
  //   if(this.isLoading) return;

  //   const element = event.target as HTMLElement;

  //   const threshold = 0; // px before the very bottom to trigger early
  //   const position = element.scrollTop + element.clientHeight;
  //   const height = element.scrollHeight;

  //   if (height - position <= threshold) {
  //     this.reachedEnd.emit();
  //   }
  // }

}
