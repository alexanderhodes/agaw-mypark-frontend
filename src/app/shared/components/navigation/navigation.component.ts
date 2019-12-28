import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mp-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  private _items: { title: string, icon: string, link: string }[];

  constructor() {
    this._items = [];
    this._items.push({ title: 'Neue Buchung', icon: 'plus', link: 'bookings' });
    this._items.push({ title: 'Serienbuchung', icon: 'history', link: 'bookings' });
    this._items.push({ title: 'Meine Buchungen', icon: 'star', link: 'bookings' });
    this._items.push({ title: 'Übersicht der Parkplätze', icon: 'list', link: 'parkingspaces' });
  }

  ngOnInit() {
  }

  get items(): { title: string, icon: string }[] {
    return this._items;
  }

}
