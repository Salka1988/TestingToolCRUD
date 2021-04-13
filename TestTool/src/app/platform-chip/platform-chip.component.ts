import {Component, Input, OnInit} from '@angular/core';
import {Platforms} from '../model/platforms';

@Component({
  selector: 'app-platform-chip',
  templateUrl: './platform-chip.component.html',
  styleUrls: ['./platform-chip.component.css']
})
export class PlatformChipComponent implements OnInit {

  constructor() { }

  @Input() platform: Platforms;

  getBackgroundColor(): string {
    return this.platform == null ? '#ff0000' : this.platform.color;
  }

  ngOnInit() {
  }

}
