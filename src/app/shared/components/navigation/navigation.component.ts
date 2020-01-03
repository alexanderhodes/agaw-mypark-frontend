import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'mp-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {

  private _items: { title: string, icon: string, link: string }[];
  private _subscription: any;
  roles: string[];

  constructor(
    private router: Router,
    private authService: AuthService) {
    this._items = [];
    this.checkRoles();
    this._subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkRoles();
      }
    });
  }

  checkRoles() {
    if (this.roles !== this.authService.roles) {
      this.roles = this.authService.roles;
      this._items = [];

      if (this.roles.indexOf('USER') > -1) {
        this._items.push({ title: 'Neue Buchung', icon: 'plus', link: 'new-booking' });
        this._items.push({ title: 'Serienbuchung', icon: 'history', link: 'series-booking' });
        this._items.push({ title: 'Meine Buchungen', icon: 'star', link: 'bookings' });
        this._items.push({ title: 'Übersicht der Parkplätze', icon: 'list', link: 'parkingspaces' });
      }

      if (this.roles.indexOf('ADMIN') > -1) {
        this._items.push({ title: 'Parkplätze', icon: 'album', link: 'admin/parkingspaces' });
        this._items.push({ title: 'Benutzer', icon: 'users', link: 'admin/users' });
        this._items.push({ title: 'Probleme', icon: 'bolt', link: 'admin/problems' });
      }
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  get items(): { title: string, icon: string, link: string }[] {
    return this._items;
  }

}
