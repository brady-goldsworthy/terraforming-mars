import {IProjectCard} from '../IProjectCard';
import {IActionCard} from '../ICard';
import {Tag} from '../../../common/cards/Tag';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import { IPlayer } from '../../IPlayer';
import { Card } from '../Card';
import { SelectPaymentDeferred } from '../../deferredActions/SelectPaymentDeferred';
import { Resource } from '../../../common/Resource';

export class UndergroundDetonations extends Card implements IActionCard, IProjectCard {
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.UNDERGROUND_DETONATIONS,
      tags: [Tag.BUILDING],
      cost: 6,

      metadata: {
        cardNumber: '202',
        renderData: CardRenderer.builder((b) => {
          b.action('Spend 8M€ to increase your heat production 2 steps. STEEL MAY BE USED as if playing a building card.', (eb) => {
            eb.megacredits(8).openBrackets.steel(1).closeBrackets.startAction.production((pb)=>pb.heat(2));
          });
        }),
      },
    });
  }
  public canAct(player: IPlayer): boolean {
    return player.canAfford({cost: 8, steel: true});
  }
  public action(player: IPlayer) {
    player.game.defer(new SelectPaymentDeferred(player, 8, {canUseSteel: true, title: 'Select how to pay for action'}));
    player.production.add(Resource.HEAT, 2);
    return undefined;
  }
}
