import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { trigger, style, transition, animate} from '@angular/animations';
import { Product } from 'src/app/shared/configurator-product.model';

@Component({
  selector: 'app-sticky-bar',
  templateUrl: './sticky-bar.component.html',
  styleUrls: ['./sticky-bar.component.scss'],
  animations: [
    trigger('sticky-bar', [
      transition(':enter', [
        style({
          transform: 'translateY(-200px)'
        }),
        animate('450ms ease-in-out', style({
          transform: '*'
        }))
      ]),
      transition(':leave', [
        animate('350ms ease-in-out', style({
          transform: 'translateY(-200px)'
        }))
      ])
    ])
  ]
})
export class StickyBarComponent {

  @Input() product: Product
  @Input() barActive: boolean = false

}
