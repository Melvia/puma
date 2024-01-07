import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {fromEvent, map, Observable, switchMap, takeUntil, tap} from "rxjs";
import {NgClass} from "@angular/common";

interface ElementPosition {
  top: number;
  left: number;
}

@Component({
  selector: 'app-lattice',
  standalone: true,
  imports: [NgClass],
  templateUrl: './lattice.component.html',
  styleUrl: './lattice.component.scss'
})
export class LatticeComponent implements OnInit {
  @ViewChild('draggable', {static: true})
  protected draggable!: ElementRef<HTMLElement>;

  lattice: number[] = [];
  latticeSize = 80;
  dragElement$(element: HTMLElement): Observable<ElementPosition> {
    const elementMouseDown$ = fromEvent<MouseEvent>(document, 'mousedown');
    const mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove');
    const mouseUp$ = fromEvent<MouseEvent>(document, 'mouseup');
    // подсчитать отступы

    return elementMouseDown$.pipe(
      tap(event => {
        event.preventDefault()
      }),
      switchMap(({offsetX, offsetY}) => mouseMove$.pipe(
          tap(event => event.preventDefault()),
          map(({clientX, clientY}) => ({
            top: clientY - offsetY,
            left: clientX - offsetX
          })),
          takeUntil(mouseUp$),
        ),
      )
    )
  }

  ngOnInit(): void {
    for (let i = 0; i < this.latticeSize; i++) {
      this.lattice[i] = 1;
    }

    const box = this.draggable?.nativeElement; //document.querySelector('.draggable') as HTMLElement;

    this.dragElement$(box).subscribe(({left}) => {
      box.style.left = `${left}px`;
    })
  }
}
