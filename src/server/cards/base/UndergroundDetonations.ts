import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {ActionCard} from '../ActionCard';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class UndergroundDetonations extends ActionCard implements IProjectCard {
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.UNDERGROUND_DETONATIONS,
      tags: [Tag.BUILDING],
      cost: 6,

      action: {
        spend: {megacredits: 10},
        production: {heat: 2},
      },

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
  public canAct(player: Player): boolean {
    return player.canAfford(8, {steel: true});
  }
  public action(player: Player) {
    player.game.defer(new SelectPaymentDeferred(player, 8, {canUseSteel: true, title: 'Select how to pay for action'}));
    player.production.add(Resources.HEAT, 2);
    return undefined;
  }
}
