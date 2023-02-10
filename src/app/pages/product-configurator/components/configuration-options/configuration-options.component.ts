import {
  AfterContentInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import {
  ConfigurationOption,
  Option,
} from 'src/app/shared/configurator-product.model';
import { ProductConfiguratorService } from '../../service/product-configurator.service';

@Component({
  selector: 'configuration-options',
  templateUrl: './configuration-options.component.html',
  styleUrls: ['./configuration-options.component.scss'],
})
export class ConfigurationOptionsComponent implements OnInit, OnDestroy {
  @Input() configurationOption: ConfigurationOption;
  selectedOption: Option;
  onDeselectOld: Subject<void> = new Subject<void>();
  registered = false;

  constructor(private configuratorService: ProductConfiguratorService) {}

  ngOnInit(): void {
    this.configuratorService.registerOptionsInService(this.configurationOption);
  }

  ngOnDestroy(): void {
    this.configuratorService.unregisterOptionsInService(
      this.configurationOption
    );
  }

  setOption($event) {
    this.selectedOption = $event;
    if (this.selectedOption !== undefined) {
      this.onDeselectOld.next();
    }

    this.configuratorService.addSelectedOption(
      this.selectedOption,
      this.configurationOption
    );
  }
}
