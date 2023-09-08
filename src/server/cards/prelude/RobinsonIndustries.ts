import {IActionCard} from '../ICard';
import {Player} from '../../Player';
import {ICorporationCard} from '../corporation/ICorporationCard';
import {OrOptions} from '../../inputs/OrOptions';
import {SelectOption} from '../../inputs/SelectOption';
import {Resources} from '../../../common/Resources';
import {Card} from '../Card';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {CardRenderer} from '../render/CardRenderer';

export class RobinsonIndustries extends Card implements IActionCard, ICorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
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
  public canAct(_player: Player): boolean {
    return true;
  }

  public initialAction(player: Player) {
    let selection: Array<SelectOption> = [];

    [Resources.MEGACREDITS, Resources.STEEL, Resources.TITANIUM, Resources.PLANTS, Resources.ENERGY, Resources.HEAT].forEach((resource) => {
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

  public action(player: Player) {
    let minimum = player.production.megacredits;
    let lowest: Array<SelectOption> = [];

    [Resources.MEGACREDITS, Resources.STEEL, Resources.TITANIUM, Resources.PLANTS, Resources.ENERGY, Resources.HEAT].forEach((resource) => {
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
