import {Tag} from '../../../common/cards/Tag';
import {PreludeCard} from './PreludeCard';
import {IProjectCard} from '../IProjectCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

// TODO(kberg): Add a test
export class SelfSufficientSettlement extends PreludeCard implements IProjectCard {
  constructor() {
    super({
      name: CardName.SELF_SUFFICIENT_SETTLEMENT,
      tags: [Tag.BUILDING, Tag.CITY],

      behavior: {
        production: {megacredits: 2},
        stock: {megacredits: 3},
        city: {},
      },

      metadata: {
        cardNumber: 'P29',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.megacredits(2)).megacredits(3).city();
        }),
        description: 'Increase your M€ production 2 steps. Gain 3M€. Place a city tile.',
      },
    });
  }
}
