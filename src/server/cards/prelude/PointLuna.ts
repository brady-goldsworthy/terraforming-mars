import {Tag} from '../../../common/cards/Tag';
import {Player} from '../../Player';
import {ICorporationCard} from '../corporation/ICorporationCard';
import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {CardRenderer} from '../render/CardRenderer';
import {played} from '../Options';
import {Priority, SimpleDeferredAction} from '../../../server/deferredActions/DeferredAction';
import {OrOptions} from '../../../server/inputs/OrOptions';
import {SelectCard} from '../../../server/inputs/SelectCard';

export class PointLuna extends Card implements ICorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.POINT_LUNA,
      tags: [Tag.SPACE, Tag.EARTH],
      startingMegaCredits: 48,

      behavior: {
        production: {titanium: 1},
      },

      metadata: {
        cardNumber: 'R10',
        description: 'You start with 1 titanium production and 48 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.production((pb) => pb.titanium(1)).nbsp.megacredits(48);
          b.corpBox('effect', (ce) => {
            ce.effect('When you play an Earth tag, draw a card then discard a card.', (eb) => {
              eb.earth(1, {played}).startEffect.plus().cards(1).nbsp.minus().cards(1);
            });
          });
        }),
      },
    });
  }
  public onCorpCardPlayed(player: Player, card: ICorporationCard) {
    return this.onCardPlayed(player, card);
  }

  public onCardPlayed(player: Player, card: IProjectCard | ICorporationCard) {
    if (player.isCorporation(this.name)) {
      const tagCount = player.tags.cardTagCount(card, Tag.EARTH);
      if (tagCount > 0) {
        player.drawCard();
        player.game.defer(new SimpleDeferredAction(
          player,
          () => {
            return new OrOptions(
              new SelectCard('Select a card to discard', 'Discard', player.cardsInHand, ([card]) => {
                player.cardsInHand.splice(player.cardsInHand.indexOf(card), 1);
                player.game.projectDeck.discard(card);
                player.game.log('${0} is discarding a card for their ${1} effect.', (b) => b.player(player).card(this));
                player.game.log('You discarded ${0}', (b) => b.card(card), {reservedFor: player});
                return undefined;
              })
            );
          },
        ),
        Priority.DISCARD_AND_DRAW);
      }
    }
    return undefined;
  }
}
