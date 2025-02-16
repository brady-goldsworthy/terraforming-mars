import {Resource} from '../../common/Resource';
import {OrOptions} from '../inputs/OrOptions';
import {SelectOption} from '../inputs/SelectOption';
import {IPlayer} from '../IPlayer';
import {DeferredAction, Priority} from './DeferredAction';

export class SelectResourceTypeDeferred extends DeferredAction {
  constructor(
    player: IPlayer,
    public resources: Array<Resource>,
    public title: string,
    public cb: (resource: Resource) => void,
  ) {
    super(player, Priority.DEFAULT);
  }

  public execute() {
    const orOptions = new OrOptions();
    orOptions.title = this.title;
    orOptions.options = this.resources.map((resource) => {
      return new SelectOption(resource, 'OK', () => {
        this.cb(resource);
        return undefined;
      });
    });
    if (orOptions.options.length === 0) {
      return undefined;
    }
    if (orOptions.options.length === 1) {
      orOptions.options[0].cb();
      return undefined;
    }
    return orOptions;
  }
}
