import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';

import { CardService } from './../../services/card.service';
import { Card } from './../../models/card.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardsComponent implements OnInit, OnDestroy {

  public cards: Card[];
  private inscricao: Subscription;
  public totalCards: number;
  public showBoundaryLinks = true;
  public name: string;
  public spin = false;
  public currentPage: number;

  constructor(
    public cardService: CardService
  ) { }

  ngOnInit() {
    this.getCards();
  }

  getCards(page?: string) {
    this.spin = true
    this.inscricao = this.cardService.getCards(page, this.name).subscribe((data: any) => {
      this.cards = data.body.cards.filter((card: Card) => {
        return card.imageUrl;
      });
      this.totalCards = data.headers.get('total-count')
      this.spin = false;
    }, err => {
      console.log(err)
      this.spin = false;
    }, () => {
      this.spin = false;
    })
  }

  pageChanged(event: any) {
    this.cardService.setPaginaAtual(event.page);
    const page = event.page;
    return this.getCards(page);
  }

  searchCard() {
    this.cardService.setPaginaAtual(1);
    return this.getCards();
  }

  scrollTop() {
    window.scrollTo(0, 0);
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }


}
