import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { ConfigurationOption, Option } from 'src/app/shared/configurator-product.model';

@Component({
  selector: 'app-configuration-options',
  templateUrl: './configuration-options.component.html',
  styleUrls: ['./configuration-options.component.scss']
})
export class ConfigurationOptionsComponent {
  @Input() configurationOption: ConfigurationOption
  selectedOption: Option
  onDeselectOld: Subject<void> = new Subject<void>();

  setOption($event) {
    this.selectedOption = $event
    if(this.selectedOption !== undefined) {
      this.onDeselectOld.next();
    }
  }
}


