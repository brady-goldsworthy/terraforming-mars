import {Card} from '../Card';
import {ICorporationCard} from '../corporation/ICorporationCard';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {CardRenderer} from '../render/CardRenderer';
import {Size} from '../../../common/cards/render/Size';

export class BoringCompany extends Card implements ICorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.BORING_COMPANY,
      tags: [],
      startingMegaCredits: 70,
      victoryPoints: 3,

      metadata: {
        cardNumber: '',
        description: 'You start with 70 M€. Gain 3 Victory Points',
        renderData: CardRenderer.builder((b) => {
          b.vSpace(Size.LARGE).br.br.br;
          b.megacredits(70, {size: Size.LARGE});
        }),
      },
    });
  }
}
