import Logger from './logger';

export default class Controller<M> {

  public static log: Logger = new Logger(this.name);

  public static nextId: number = 1;

  public static getNextId(): number {
    this.log.debug('getNextId', { currentId: this.nextId });
    return this.nextId++;
  }

  protected log: Logger = new Logger(this);

  protected model: M;

  protected get nextId() {
    return Controller.nextId;
  }

  protected set nextId(value: number) {
    Controller.nextId = value;
  }

  constructor(init: M) {
    this.model = init;
  }

  protected getNextId(): number {
    return Controller.getNextId();
  }

  public toJSON(): string {
    return JSON.stringify(this.model);
  }
}