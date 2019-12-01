import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private _dropdownOpened;

  constructor() {
    this._dropdownOpened = false;
  }

  ngOnInit() {
  }

  openDropdown() {
    this._dropdownOpened = !this._dropdownOpened;
    console.log("open dropdown", this._dropdownOpened);
  }

  get dropdownOpened(): boolean {
    return this._dropdownOpened;
  }

}
