import Mithril from 'mithril';

export default class Checko {

  private readonly url: string;

  constructor(apiKey: string) {
    this.url = ` https://api.checko.ru/v2/company?key=${apiKey}`;
    Mithril.request(this.url, {
      method: ''
    })
  }
}