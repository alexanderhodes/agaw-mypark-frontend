import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'mp-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {

  @Input()
  public isLoading: boolean;

  constructor() { }

  ngOnInit() {
  }

}
