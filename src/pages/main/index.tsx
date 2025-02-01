import Mithril from 'mithril';
import DefaultPage from '../../libs/pages/default';

export type Attrs = {};

export default class MainPage extends DefaultPage<Attrs> {

  public title = 'Главная';

  protected render(): Mithril.Children {
    return <p>Main page111</p>;
  }
}