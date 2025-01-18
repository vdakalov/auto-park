import Mithril from 'mithril';
import ErrorLayout from '../layouts/error';
import Page from '../libs/page';

export type Attrs = {
  code?: number;
  error?: Error;
};

export default class ErrorPage extends Page implements Mithril.ClassComponent<Attrs> {

  public title = '';

  public view(vnode: Mithril.Vnode<Attrs, this>): Mithril.Children {
    let title = 'Ошибка';
    let name = 'Unknown';
    let message = 'Unknown error (no details)';
    let stack = 'no stack';
    if (vnode.attrs.error !== undefined) {
      title = vnode.attrs.error.name;
      name = vnode.attrs.error.name;
      message = vnode.attrs.error.message;
      stack = vnode.attrs.error.stack || '';
    } else if (vnode.attrs.code !== undefined) {
      title = `Ошибка ${vnode.attrs.code}`;
      name = title;
    }
    return <ErrorLayout
      title={title}
      name={name}
      message={message}
      stack={stack}
    />
  }
}