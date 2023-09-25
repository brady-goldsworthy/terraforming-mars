import {BaseMilestone} from './IMilestone';
import {IPlayer} from '../IPlayer';

export class Economizer extends BaseMilestone {
  constructor() {
    super(
      'Economizer',
      'Have 8 heat production',
      8);
  }
  public getScore(player: IPlayer): number {
    return player.production.heat;
  }
}
