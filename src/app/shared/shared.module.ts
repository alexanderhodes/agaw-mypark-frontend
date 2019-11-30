import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonComponent } from './components/button/button.component';


@NgModule({
  declarations: [ButtonComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    NgbModule
  ],
  exports: [
    ButtonComponent
  ]
})
export class SharedModule { }
