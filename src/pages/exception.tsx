import Mithril from 'mithril';
import ErrorLayout from '../layouts/error';
import Page from '../libs/page';
import Exception, { ExceptionObject } from '../libs/exception';

export type Attrs = {
  exception?: Exception | ExceptionObject;
};

export default class ExceptionPage extends Page<Attrs> {

  public title = '';

  protected render(vnode: Mithril.Vnode<Attrs, this>): Mithril.Children {
    let title = 'Ошибка';
    let name = 'Unknown';
    let message = 'Unknown error (no details)';
    let stack = 'no stack';
    if (vnode.attrs.exception !== undefined) {
      title = vnode.attrs.exception.name;
      name = vnode.attrs.exception.name;
      message = vnode.attrs.exception.message;
      stack = vnode.attrs.exception.stack || '';

      if (vnode.attrs.exception.httpStatus !== undefined) {
        name += ` ${vnode.attrs.exception.httpStatus.code
        } ${vnode.attrs.exception.httpStatus.message}`;
      }
    }
    return <ErrorLayout
      title={title}
      name={name}
      message={message}
      stack={stack}
    />
  }
}