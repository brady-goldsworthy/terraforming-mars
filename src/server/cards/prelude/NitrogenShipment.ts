import {digit} from './../Options';
import {PreludeCard} from './PreludeCard';
import {IProjectCard} from '../IProjectCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Tag} from '../../../common/cards/Tag';

export class NitrogenShipment extends PreludeCard implements IProjectCard {
  constructor() {
    super({
      name: CardName.NITROGEN_SHIPMENT,
      tags: [Tag.EARTH],
      behavior: {
        tr: 2,
        stock: {plants: 5},
      },

      metadata: {
        cardNumber: 'P24',
        renderData: CardRenderer.builder((b) => {
          b.tr(2).plants(5, {digit});
        }),
        description: 'Increase your TR 2 steps. Gain 5 plants.',
      },
    });
  }
}
