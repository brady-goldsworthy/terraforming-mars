import {Tag} from '../../../common/cards/Tag';
import {IPlayer} from '../../IPlayer';
import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {ICorporationCard} from '../corporation/ICorporationCard';
import {SelectOption} from '../../inputs/SelectOption';
import {OrOptions} from '../../inputs/OrOptions';
import {CardResource} from '../../../common/CardResource';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {CardRenderer} from '../render/CardRenderer';
import {Size} from '../../../common/cards/render/Size';
import {Resource} from '../../../common/Resource';
import {all, played} from '../Options';
import {newMessage} from '../../logs/MessageBuilder';

export class Splice extends Card implements ICorporationCard {
  constructor() {
    super({
      type: CardType.CORPORATION,
      name: CardName.SPLICE,
      tags: [Tag.MICROBE],
      startingMegaCredits: 47, // 42 + 5 as card resolution when played

      firstAction: {
        text: 'Draw 2 cards with a microbe tag',
        drawCard: {count: 2, tag: Tag.MICROBE},
      },

      metadata: {
        cardNumber: 'R28',
        description: 'You start with 42 M€. As your first action, draw two microbe cards.',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(42).nbsp.cards(2, {secondaryTag: Tag.MICROBE});
          b.corpBox('effect', (ce) => {
            ce.vSpace(Size.LARGE);
            ce.effect(undefined, (eb) => {
              eb.microbes(1, {played, all}).startEffect;
              eb.megacredits(2, {all}).or().microbes(1, {all}).asterix();
            });
            ce.vSpace();
            ce.effect('when a microbe tag is played, incl. this, THAT PLAYER gains 2 M€, or adds a microbe to THAT card, and you gain 3 M€.', (eb) => {
              eb.microbes(1, {played, all}).startEffect;
              eb.megacredits(3);
            });
          });
        }),
      },
    });
  }

  public onCardPlayed(player: IPlayer, card: IProjectCard) {
    return this._onCardPlayed(player, card);
  }

  public onCorpCardPlayed(player: IPlayer, card: ICorporationCard) {
    return this._onCardPlayed(player, card);
  }

  private _onCardPlayed(player: IPlayer, card: IProjectCard | ICorporationCard): OrOptions | undefined {
    if (card.tags.includes(Tag.MICROBE) === false) {
      return undefined;
    }
    const spliceGainPerMicrobe = 3;
    const otherGainPerMicrobe = 2;
    const microbeTagsCount = player.tags.cardTagCount(card, Tag.MICROBE);
    const spliceMegacreditsGain = microbeTagsCount * spliceGainPerMicrobe;
    const otherMegacreditsGain = microbeTagsCount * otherGainPerMicrobe;

    const addResource = new SelectOption('Add a microbe resource to this card', 'Add microbe', () => {
      player.addResourceTo(card);
      return undefined;
    });

    const getMegacredits = new SelectOption(
      newMessage('Gain ${0} M€', (b)=>b.number(otherMegacreditsGain)),
      'Gain M€',
      () => {
        player.stock.add(Resource.MEGACREDITS, otherMegacreditsGain, {log: true});
        return undefined;
      });

    // Splice owner get 3M€ per microbe tag
    player.game.getCardPlayerOrThrow(this.name).stock.add(Resource.MEGACREDITS, spliceMegacreditsGain, {log: true});

    // Card player choose between 2 M€ and a microbe on card, if possible
    if (card.resourceType === CardResource.MICROBE) {
      return new OrOptions(addResource, getMegacredits);
    } else {
      player.stock.add(Resource.MEGACREDITS, otherMegacreditsGain, {log: true});
      return undefined;
    }
  }
}
