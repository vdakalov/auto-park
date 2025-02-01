import Mithril from 'mithril';
import Page from '../page';
import DefaultLayout from '../../layouts/default';

export default abstract class DefaultPage<Attrs> extends Page<Attrs> {
  public title: string = this.constructor.name || DefaultPage.name;

  public view(vnode: Mithril.Vnode<Attrs, this>): Mithril.Children | null | undefined {
    return <DefaultLayout title={this.title}>{super.view(vnode)}</DefaultLayout>;
  }
}