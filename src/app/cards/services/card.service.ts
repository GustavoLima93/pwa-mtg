import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';

import { environment } from './../../../environments/environment';
import { Card } from '../models/card.model';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CardService {

  private urlCards = `${environment.url}/cards`;

  private paginaAtual = 1

  constructor(
    private http: HttpClient
  ) { }


  getCards(page?:string,name?:string): Observable<HttpResponse<Card>> {

    page ? page = page : page = '1';
    name ? name = name : name = '';

    return this.http.get<Card>(this.urlCards,{
      observe: 'response',
      params: new HttpParams()
      .set('pageSize', '30')
      .set('page', page)
      .set('name',name)
    })
  }

  getPaginaAtual() {
    return this.paginaAtual
  }

  setPaginaAtual(param:number){
    return this.paginaAtual = param
  }

}
