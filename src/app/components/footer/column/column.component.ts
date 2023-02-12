import { Component, Input, OnInit, Output } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import {
  trigger,
  style,
  transition,
  animate,
  group,
  state,
} from '@angular/animations';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  animations: [
    trigger('icon', [
      state(
        'open',
        style({
          transform: 'rotate(45deg)',
        })
      ),
      state(
        'close',
        style({
          transform: 'rotate(0)',
        })
      ),
      transition('open <=> close', animate(150)),
    ]),
    trigger('column', [
      transition(':enter', [
        style({
          // opacity: 0,
          // transform: 'translateY(-10px)',
          height: '10px',
        }),
        animate(
          '100ms',
          style({
            height: '*',
          })
        ),
        animate(
          200,
          style({
            // opacity: 1,
            // transform: 'translateY(0px)',
          })
        ),
      ]),
      transition(':leave', [
        style({
          // opacity: 1
        }),
        group([
          animate(
            100,
            style({
              // opacity: 0,
              // transform: 'translateY(-20px)'
            })
          ),
          animate(
            '200ms',
            style({
              height: '0px',
            })
          ),
        ]),
      ]),
    ]),
  ],
})
export class ColumnComponent implements OnInit {
  @Input() myColumnData!: Column;
  @Output('onPageChanged') onLinkClick = new Subject<void>();

  iconAnimationState: string = 'close';
  linksAnimationState: string = 'opened';

  isVisibleLinks: boolean = true;
  showlinks: boolean = true;
  inMobileMode: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(max-width: 833px)'])
      .subscribe((result: BreakpointState) => {
        if (result.matches) {
          this.inMobileMode = true;
          this.isVisibleLinks = false;
        } else {
          this.inMobileMode = false;
          this.isVisibleLinks = true;
        }
      });
  }

  linkClick() {
    setTimeout(() => {
      window.scroll(0, 0);
    }, 10);
    this.onLinkClick.next();
  }

  ChangeLinksVisibility() {
    if (this.inMobileMode) this.isVisibleLinks = !this.isVisibleLinks;
  }
}

export class Column {
  title: string;
  linksName: string[];

  constructor(_title: string, _links: string[]) {
    this.title = _title;
    this.linksName = _links;
  }
}
