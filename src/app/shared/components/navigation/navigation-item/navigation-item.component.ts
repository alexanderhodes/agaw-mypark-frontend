import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mp-navigation-item',
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.scss']
})
export class NavigationItemComponent implements OnInit {

  private _title: string;
  private _icon: string;
  private _link: string;

  constructor(private route: ActivatedRoute) {
    // this.route.url.subscribe((urlSegment: UrlSegment[]) => {
    //   console.log('title', this._title);
    //   console.log('urlSegment', this.route);
    //   console.log('------------------------');
    // });
  }

  ngOnInit() {
  }

  get icon(): string {
    return this._icon;
  }

  @Input()
  set icon(value: string) {
    this._icon = value;
  }

  get title(): string {
    return this._title;
  }

  @Input()
  set title(value: string) {
    this._title = value;
  }

  routerLinks(): string[] {
    // ['/link']
    return [`/${this._link}`];
  }

  @Input()
  set link(value: string) {
    this._link = value;
  }

}
