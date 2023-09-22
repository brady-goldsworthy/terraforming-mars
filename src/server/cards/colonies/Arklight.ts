import {ICorporationCard} from '../corporation/ICorporationCard';
import {IPlayer} from '../../IPlayer';
import {Tag} from '../../../common/cards/Tag';
import {CardResource} from '../../../common/CardResource';
import {IProjectCard} from '../IProjectCard';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {Card} from '../Card';
import {CardRenderer} from '../render/CardRenderer';
import {played} from '../Options';
import {Resources} from '../../../common/Resources';

export class Arklight extends Card implements ICorporationCard {
  constructor() {
    super({
      name: CardName.ARKLIGHT,
      tags: [Tag.ANIMAL],
      startingMegaCredits: 50,
      resourceType: CardResource.ANIMAL,
      type: CardType.CORPORATION,
      victoryPoints: {resourcesHere: {}, per: 2},

      behavior: {
        production: {megacredits: 1},
        addResources: 1,
      },

      metadata: {
        cardNumber: 'R04',
        description: 'You start with 50 M€. 1 VP per 2 animals on this card.',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(50);
          b.corpBox('effect', (ce) => {
            ce.effect('When you play an animal or plant tag, including this, gain 1 M€ production and add 1 animal to this card.', (eb) => {
              eb.animals(1, {played}).slash().plants(1, {played}).startEffect.production((pb) => pb.megacredits(1)).animals(1);
            });
            ce.vSpace(); // to offset the description to the top a bit so it can be readable
          });
        }),
      },
    });
  }

  public onCardPlayed(player: IPlayer, card: IProjectCard): void {
    if (player.isCorporation(CardName.ARKLIGHT)) {
      const num_tags = card.tags.filter((cardTag) => cardTag === Tag.ANIMAL || cardTag === Tag.PLANT).length
      player.addResourceTo(this, {qty: num_tags, log: true});
      player.production.add(Resources.MEGACREDITS, num_tags, {log: true})
    }
  }
}
