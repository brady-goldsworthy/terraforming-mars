import {Tag} from '../../../common/cards/Tag';
import {PreludeCard} from './PreludeCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class Biofuels extends PreludeCard {
  constructor() {
    super({
      name: CardName.BIOFUELS,
      tags: [Tag.MICROBE, Tag.POWER],

      behavior: {
        production: {energy: 2, plants: 1},
        stock: {plants: 2},
      },

      metadata: {
        cardNumber: 'P03',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.energy(2).plants(1)).br;
          b.plants(2);
        }),
        description: 'Increase your energy production 2 steps and plant production 1 step. Gain 2 plants.',
      },
    });
  }
}

