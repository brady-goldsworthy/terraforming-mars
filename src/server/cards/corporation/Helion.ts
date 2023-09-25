import {Card} from '../Card';
import {ICorporationCard} from './ICorporationCard';
import {Tag} from '../../../common/cards/Tag';
import {IPlayer} from '../../IPlayer';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {CardRenderer} from '../render/CardRenderer';
import {multiplier} from '../Options';
import {digit} from '../Options';
import {Size} from '../../../common/cards/render/Size';

export class Helion extends Card implements ICorporationCard {
  constructor() {
    super({
      type: CardType.CORPORATION,
      name: CardName.HELION,
      tags: [Tag.SPACE],
      startingMegaCredits: 40,

      behavior: {
        production: {heat: 4},
        temperatureDiscount: 1
      },

      metadata: {
        cardNumber: 'R18',
        description: 'You start with 4 heat production and 40 M€.',
        renderData: CardRenderer.builder((b) => {
          b;
          b.production((pb) => pb.heat(4)).nbsp.megacredits(40);
          b.corpBox('effect', (ce) => {
            ce.vSpace();
            ce.effect('You may use heat as M€. You may not use M€ as heat.', (eb) => {
              eb.startEffect.text('x').heat(1).equals().megacredits(0, {multiplier});
            });
            ce.vSpace(Size.SMALL);
            ce.effect('You may always spend 7 heat, instead of 8, to raise the temperature.', (eb) => {
              eb.heat(7, {digit}).startAction.temperature(1);
            });
          });
        }),
      },
    });
  }
  public override bespokePlay(player: IPlayer) {
    player.canUseHeatAsMegaCredits = true;
    return undefined;
  }
}
