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

  constructor(
    private cardService: CardService
  ) { }

  ngOnInit() {
    this.getCards();
  }

  getCards(page?: string) {
   this.inscricao = this.cardService.getCards(page,this.name).subscribe((data: any) => {
      this.cards = data.body.cards.filter((card: Card) => {
        return card.imageUrl;
      });
      this.totalCards = data.headers.get('total-count')
    })
  }

  pageChanged(event: any) {
    const page = event.page;
    return this.getCards(page);
  }

  scrollTop() {
    window.scrollTo(0, 0);
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }


}
