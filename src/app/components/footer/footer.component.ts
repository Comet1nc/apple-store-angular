import { Component, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Column } from './column/column.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  columnsData: Column[] = [
    new Column('Shop and Learn', ['Mac', 'iPad', 'iPhone', 'Watch']),
    new Column('Services', [
      'Apple Music',
      'Apple TV+',
      'Apple Fintess+',
      'iCloud',
    ]),
    new Column('About Apple', [
      'Contact Apple',
      'Events',
      'Investors',
      'Newsroom',
    ]),
  ];

  @Output('onPageChanged') onPageChanged = new Subject<void>();

  onLinkClick() {
    this.onPageChanged.next();
  }
}
