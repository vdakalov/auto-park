import Mithril from 'mithril';
import DefaultPage from '../../libs/pages/default';
import { LocationPath } from '../../libs/location-path';

export type Attrs = {
  id: string;
};

export default class DocumentPage extends DefaultPage<Attrs> {
  protected render(vnode: Mithril.Vnode<Attrs, this>): Mithril.Children {
    const document = this.ensurePageDocument();
    this.title = document.title;
    return <div>
      {Mithril(Mithril.route.Link, {
        href: LocationPath.DocumentEdit,
        class: 'btn btn-link',
        params: {
          id: document.id.toString()
        }
      }, 'Изменить')}
      <p>{document.content}</p>
      <i>{document.author.name}</i>
      <h4>Стороны</h4>
      <ul>
        {document.acceptors.toArray().map(acc => <li>{acc.name}</li>)}
      </ul>
    </div>;
  }
}
