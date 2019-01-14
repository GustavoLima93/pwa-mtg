import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PaginationModule } from 'ngx-bootstrap/pagination';

import { CardsComponent } from './components';


@NgModule({
  declarations: [
    CardsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule.forRoot()

  ]
})
export class CardsModule { }
