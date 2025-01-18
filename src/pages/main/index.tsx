import Mithril from 'mithril';
import DefaultLayout from '../../layouts/default';
import Page from '../../libs/page';

export default class MainPage extends Page implements Mithril.ClassComponent {

  public title = 'Главная';

  public view(vnode: Mithril.Vnode<{}, this>): Mithril.Children {
    return <DefaultLayout page={this}>
    </DefaultLayout>;
  }
}