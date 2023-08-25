import {Tag} from '../../../common/cards/Tag';
import {Player} from '../../Player';
import {Card} from '../Card';
import {ICorporationCard} from '../corporation/ICorporationCard';
import {IActionCard} from '../ICard';
import {CardName} from '../../../common/cards/CardName';
import {CardResource} from '../../../common/CardResource';
import {SelectOption} from '../../inputs/SelectOption';
import {SelectCard} from '../../inputs/SelectCard';
import {OrOptions} from '../../inputs/OrOptions';
import {LogHelper} from '../../LogHelper';
import {Resources} from '../../../common/Resources';
import {CardType} from '../../../common/cards/CardType';
import {CardRenderer} from '../render/CardRenderer';
import {Size} from '../../../common/cards/render/Size';
import {digit} from '../Options';
import {PlayerInput} from '../../PlayerInput';
import {AltSecondaryTag} from '../../../common/cards/render/AltSecondaryTag';

export class Astrodrill extends Card implements IActionCard, ICorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.ASTRODRILL,
      tags: [Tag.SPACE],
      startingMegaCredits: 40,
      resourceType: CardResource.ASTEROID,
      initialActionText: 'Draw two cards with an asteroid icon on it',

      behavior: {
        addResources: 4,
      },

      metadata: {
        cardNumber: 'R21',
        description: 'You start with 40 M€ and 4 asteroid resources. As your first action, reveal cards from the deck until you have revealed a card with an asteroid icon on it. Take it into hand and discard the rest.',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(40).nbsp.asteroids(4, {digit}).nbsp.cards(2, {secondaryTag: AltSecondaryTag.WILD_RESOURCE});;
          b.corpBox('action', (ce) => {
            ce.vSpace(Size.SMALL);
            ce.action(undefined, (eb) => {
              eb.empty().startAction.asteroids(1).asterix().slash().wild(1).or();
            });
            ce.vSpace();
            ce.action('Add an asteroid resource to ANY card OR gain any standard resource, OR remove an asteroid resource from this card to gain 3 titanium.', (eb) => {
              eb.asteroids(1).startAction.titanium(3, {digit});
            });
          });
        }),
      },
    });
  }

  public canAct(): boolean {
    return true;
  }

  public initialAction(player: Player) {
    player.drawCard(2, {
      include: (card) => card.resourceType === CardResource.ASTEROID,
    });
    return undefined;
  }

  public action(player: Player) {
    const asteroidCards = player.getResourceCards(CardResource.ASTEROID);
    const opts: Array<PlayerInput> = [];

    const gainStandardResource = new SelectOption('Gain a standard resource', 'Gain', () => {
      return new OrOptions(
        new SelectOption('Gain 1 titanium', 'Gain titanium', () => {
          player.addResource(Resources.TITANIUM, 1, {log: true});
          return undefined;
        }),
        new SelectOption('Gain 1 steel', 'Gain steel', () => {
          player.addResource(Resources.STEEL, 1, {log: true});
          return undefined;
        }),
        new SelectOption('Gain 1 plant', 'Gain plant', () => {
          player.addResource(Resources.PLANTS, 1, {log: true});
          return undefined;
        }),
        new SelectOption('Gain 1 energy', 'Gain energy', () => {
          player.addResource(Resources.ENERGY, 1, {log: true});
          return undefined;
        }),
        new SelectOption('Gain 1 heat', 'Gain heat', () => {
          player.addResource(Resources.HEAT, 1, {log: true});
          return undefined;
        }),
        new SelectOption('Gain 1 M€', 'Gain M€', () => {
          player.addResource(Resources.MEGACREDITS, 1, {log: true});
          return undefined;
        }),
      );
    });

    const addResourceToSelf = new SelectOption('Add 1 asteroid to this card', 'Add asteroid', () => {
      player.addResourceTo(this, {log: true});

      return undefined;
    });

    const addResource = new SelectCard(
      'Select card to add 1 asteroid',
      'Add asteroid',
      asteroidCards,
      ([card]) => {
        player.addResourceTo(card, {log: true});

        return undefined;
      },
    );

    const spendResource = new SelectOption('Remove 1 asteroid on this card to gain 3 titanium', 'Remove asteroid', () => {
      this.resourceCount--;
      player.titanium += 3;
      LogHelper.logRemoveResource(player, this, 1, 'gain 3 titanium');

      return undefined;
    });

    if (this.resourceCount > 0) opts.push(spendResource);
    asteroidCards.length === 1 ? opts.push(addResourceToSelf) : opts.push(addResource);
    opts.push(gainStandardResource);

    return new OrOptions(...opts);
  }
}
