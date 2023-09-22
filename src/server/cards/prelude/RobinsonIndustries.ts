import {IActionCard} from '../ICard';
import {IPlayer} from '../../IPlayer';
import {ICorporationCard} from '../corporation/ICorporationCard';
import {OrOptions} from '../../inputs/OrOptions';
import {SelectOption} from '../../inputs/SelectOption';
import {ALL_RESOURCES} from '../../../common/Resource';
import {Card} from '../Card';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {CardRenderer} from '../render/CardRenderer';

export class RobinsonIndustries extends Card implements IActionCard, ICorporationCard {
  constructor() {
    super({
      type: CardType.CORPORATION,
      name: CardName.ROBINSON_INDUSTRIES,
      startingMegaCredits: 47,
      initialActionText: 'Increase any production two steps',

      metadata: {
        cardNumber: 'R27',
        description: 'You start with 47 M€. As your first action increase any production two steps.',
        renderData: CardRenderer.builder((b) => {
          b.br.br.br;
          b.megacredits(47);
          b.corpBox('action', (ce) => {
            ce.action('Increase (one of) your LOWEST production 1 step.', (eb) => {
              eb.startAction.production((pb) => pb.wild(1).asterix());
            });
          });
        }),
      },
    });
  }
  public canAct(_player: IPlayer): boolean {
    return true;
  }

  public initialAction(player: IPlayer) {
    let selection: Array<SelectOption> = [];

    ALL_RESOURCES.forEach((resource) => {
      const option = new SelectOption('Increase ' + resource + ' production 2 steps', 'Select', () => {
        player.production.add(resource, 2, {log: true});
        return undefined;
      });

      selection.push(option)
    })

    const result = new OrOptions();
    result.options = selection;
    return result;
  }

  public action(player: IPlayer) {
    let minimum = player.production.megacredits;
    let lowest: Array<SelectOption> = [];

    ALL_RESOURCES.forEach((resource) => {
      const option = new SelectOption('Increase ' + resource + ' production 1 step', 'Select', () => {
        player.production.add(resource, 1, {log: true});
        return undefined;
      });

      if (player.production[resource] < minimum) {
        lowest = [];
        minimum = player.production[resource];
      }
      if (player.production[resource] === minimum) lowest.push(option);
    });

    const result = new OrOptions();
    result.options = lowest;
    return result;
  }
}
