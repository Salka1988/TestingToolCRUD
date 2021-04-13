import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.html',
  styleUrls: ['progress-bar.css'],
})
export class ProgressBarComponent implements OnInit {


  @Input() inputSucceeded;
  @Input() inputFailed;
  @Input() inputNumberOfTestcases;

  ngOnInit() {
  }

}
