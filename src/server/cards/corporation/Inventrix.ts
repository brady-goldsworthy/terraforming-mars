import {Card} from '../Card';
import {ICorporationCard} from './ICorporationCard';
import {Tag} from '../../../common/cards/Tag';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {CardRenderer} from '../render/CardRenderer';

export class Inventrix extends Card implements ICorporationCard {
  constructor() {
    super({
      type: CardType.CORPORATION,
      name: CardName.INVENTRIX,
      tags: [Tag.SCIENCE],
      startingMegaCredits: 50,

      firstAction: {
        text: 'Draw 3 cards',
        drawCard: 3,
      },

      metadata: {
        cardNumber: 'R43',
        description: 'As your first action in the game, draw 3 cards. Start with 50 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.megacredits(50).nbsp.cards(3);
          b.corpBox('effect', (ce) => {
            ce.effect('Your temperature, oxygen, ocean, and Venus requirements are +3 or -3 steps, your choice in each case.', (eb) => {
              eb.plate('Global requirements').startEffect.text('+/- 3');
            });
          });
        }),
      },
    });
  }
  public getRequirementBonus(): number {
    return 3;
  }
}

