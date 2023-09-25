import {Card} from '../Card';
import {Tag} from '../../../common/cards/Tag';
import {ICorporationCard} from './ICorporationCard';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {CardRenderer} from '../render/CardRenderer';
import {played} from '../Options';

export class Thorgate extends Card implements ICorporationCard {
  constructor() {
    super({
      type: CardType.CORPORATION,
      name: CardName.THORGATE,
      tags: [Tag.POWER],
      startingMegaCredits: 38,

      behavior: {
        production: {energy: 3},
      },

      cardDiscount: {tag: Tag.POWER, amount: 3},
      metadata: {
        cardNumber: 'R13',
        description: 'You start with 3 energy production and 38 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.production((pb) => pb.energy(3)).nbsp.megacredits(38);
          b.corpBox('effect', (ce) => {
            ce.effect('When playing a power card OR THE STANDARD PROJECT POWER PLANT, you pay 3 M€ less for it.', (eb) => {
              eb.energy(1, {played}).asterix().startEffect.megacredits(-3);
            });
          });
        }),
      },
    });
  }
}

