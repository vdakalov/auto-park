import RefModelController from './ref';
import ApplicationModelController from '../../model/application/controller';
import ModelController from './index';

export default abstract class ListModelController<M, I extends ModelController<any>> extends RefModelController<M> {

  public get length(): number {
    return this.items.length;
  }

  protected items: I[] = [];

  constructor(init: M, applicationModelController: ApplicationModelController) {
    super(init, applicationModelController);
    this.initialize();
  }

  protected abstract initialize(): void;

  public addItem(item: I): void {
    this.items.push(item);
  }

  public addUniqueItem(item: I): boolean {
    if (!this.items.includes(item)) {
      this.items.push(item);
      return true;
    }
    return false;
  }

  public hasItem(item: I): boolean {
    return this.items.includes(item);
  }

  public getItem(index: number): I | undefined {
    return this.items[index];
  }

  public removeItems(index: number, count: number = 1): I[] {
    if (this.items.hasOwnProperty(index)) {
      return this.items.splice(index, count);
    }
    return [];
  }

  public toArray(): I[] {
    return this.items.slice(0, this.items.length);
  }

  public *[Symbol.iterator](): Iterator<I> {
    for (const item of this.items) {
      yield item;
    }
  }
}