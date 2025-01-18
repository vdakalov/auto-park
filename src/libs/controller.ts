import Logger from './logger';

export default class Controller<M> {

  protected log: Logger = new Logger(this);

  protected model: M;

  constructor(init: M) {
    this.model = init;
  }

  public toJSON(): string {
    return JSON.stringify(this.model);
  }
}