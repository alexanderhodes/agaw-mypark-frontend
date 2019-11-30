import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonComponent } from './components/button/button.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NavigationItemComponent } from './components/navigation/navigation-item/navigation-item.component';


@NgModule({
  declarations: [ButtonComponent, HeaderComponent, NavigationComponent, NavigationItemComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    NgbModule
  ],
  exports: [
    ButtonComponent,
    HeaderComponent,
    NavigationComponent
  ]
})
export class SharedModule { }
