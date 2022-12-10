import {Tag} from '../../../common/cards/Tag';
import {PreludeCard} from './PreludeCard';
import {IProjectCard} from '../IProjectCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {digit} from './../Options';

export class MoholeExcavation extends PreludeCard implements IProjectCard {
  constructor() {
    super({
      name: CardName.MOHOLE_EXCAVATION,
      tags: [Tag.BUILDING],

      behavior: {
        production: {steel: 1, heat: 2},
        stock: {steel: 5},
      },

      metadata: {
        cardNumber: 'P23',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.steel(1).br;
            pb.heat(2);
          }).steel(5, {digit});
        }),
        description: 'Increase your steel production 1 step and heat production 2 steps. Gain 5 steel.',
      },
    });
  }
}
