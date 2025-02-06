import Logger from '../logger';

export default class ModelController<M> {

  public static log: Logger = new Logger(this.name);

  public static nextId: number = 1;

  public static getNextId(): number {
    this.log.debug('getNextId', { currentId: this.nextId });
    return this.nextId++;
  }

  protected log: Logger = new Logger(this);

  protected model: M;

  constructor(init: M, id?: number) {
    this.model = init;
    if (id !== undefined && id >= ModelController.nextId) {
      const new_ = id + 1;
      this.log.debug('NextId update', { current: ModelController.nextId, id, new: new_ });
      ModelController.nextId = new_;
    }
  }

  public toJSON(): string {
    return JSON.stringify(this.model);
  }
}