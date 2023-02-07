import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ConfigurationOption, Option } from 'src/app/shared/configurator-product.model';
import { ProductConfiguratorService } from '../../service/product-configurator.service';

@Component({
  selector: 'app-configuration-options',
  templateUrl: './configuration-options.component.html',
  styleUrls: ['./configuration-options.component.scss']
})
export class ConfigurationOptionsComponent implements OnInit, AfterContentInit {
  @Input() configurationOption: ConfigurationOption
  selectedOption: Option
  onDeselectOld: Subject<void> = new Subject<void>();

  constructor(private configuratorService: ProductConfiguratorService) { }
  ngAfterContentInit(): void {
    
  }

  ngOnInit(): void {
    this.configuratorService.registerOptionsInService(this.configurationOption)
  }


  setOption($event) {
    this.selectedOption = $event
    if(this.selectedOption !== undefined) {
      this.onDeselectOld.next();
    }

    this.configuratorService.addSelectedOption(this.selectedOption, this.configurationOption)
  }


}


