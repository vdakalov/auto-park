import Mithril from 'mithril';
import * as checko from './api';

export class CheckoException extends Error {

  public static isValid(meta: checko.Meta.Type): boolean {
    return meta.status === checko.Meta.Status.Error;
  }

  constructor(meta: checko.Envelop<unknown>['meta']) {
    const message = `[balance=${meta.balance
    }, rpd=${meta.today_request_count}]: ${meta.message || '<no-error-message>'}`;
    super(message);
    this.name = this.constructor.name;
  }
}

export default class Checko {

  private readonly url: string;

  constructor(apiKey: string) {
    this.url = `https://api.checko.ru/v2/company?key=${apiKey}`;
  }

  private request<T>(params: Mithril.RequestOptions<unknown>['params']): Promise<T> {
    return Mithril
      .request<checko.Envelop<T>>(this.url, { params })
      .then(({ data, meta }) => {
        if (CheckoException.isValid(meta)) {
          throw new CheckoException(meta);
        }
        return data;
      });
  }

  public getCompanyInfo(inn: number): Promise<checko.Company> {
    return this
      .request<checko.Company>({ inn });
  }
}