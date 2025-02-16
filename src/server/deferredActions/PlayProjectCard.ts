import {IProjectCard} from '../cards/IProjectCard';
import {SelectProjectCardToPlay} from '../inputs/SelectProjectCardToPlay';
import {IPlayer} from '../IPlayer';
import {DeferredAction, Priority} from './DeferredAction';

export class PlayProjectCard extends DeferredAction {
  constructor(player: IPlayer, private cb?: (card: IProjectCard | undefined) => void) {
    super(player, Priority.DEFAULT);
  }

  public execute() {
    const playableCards = this.player.getPlayableCards();
    if (playableCards.length === 0) {
      this.cb?.(undefined);
      return undefined;
    }
    return new SelectProjectCardToPlay(this.player, playableCards, {cb: this.cb});
  }
}
