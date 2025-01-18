
export default class Logger {

  public readonly id: string;

  constructor(object: unknown) {
    this.id = typeof object === 'object' && object != null
      ? object.constructor.name
      : String(object);

    this.debug('created');
  }

  private createTimestamp(): string {
    return window.performance.now().toFixed(3);
  }

  private createRecord(type: Function, data: unknown[]): unknown[] {
    let tag = 'UNK';
    let color = '';
    switch (type) {
      case this.debug:
        tag = 'DBG';
        color = '#AA00AA';
        break;
      case this.error:
        tag = 'ERR';
        color = '#AA0000';
        break;
      case this.warning:
        tag = 'WRN';
        color = '#AA5500';
        break;
      case this.info:
        tag = 'INF';
        color = '#0000AA';
        break;
      case this.verbose:
        tag = 'VRB';
        color = '';
        break;
      case this.success:
        tag = 'SCS';
        color = '#00AA00';
        break;
    }
    return [
      `%c${this.createTimestamp()} %c[${tag}] %c${this.id}`,
      'color: gray',
      `color: ${color}`,
      'font-weight: bold',
      ...data];
  }

  public destroy(): void {
    this.debug('destroyed');
  }

  public debug(...data: unknown[]): void {
    console.debug(...this.createRecord(this.debug, data));
  }

  public error(...data: unknown[]): void {
    console.error(...this.createRecord(this.error, data));
  }

  public warning(...data: unknown[]): void {
    console.warn(...this.createRecord(this.warning, data));
  }

  public info(...data: unknown[]): void {
    console.info(...this.createRecord(this.info, data));
  }

  public verbose(...data: unknown[]): void {
    console.log(...this.createRecord(this.verbose, data));
  }

  public success(...data: unknown[]): void {
    console.log(...this.createRecord(this.success, data));
  }
}