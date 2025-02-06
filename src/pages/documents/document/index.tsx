import Mithril from 'mithril';
import DocumentModelController from '../../../model/document/controller';
import { LocationPath } from '../../../libs/location-path';

export type Attrs = {
  document: DocumentModelController;
};

export default class DocumentComponent implements Mithril.ClassComponent<Attrs> {
  public view(vnode: Mithril.Vnode<Attrs, this>): Mithril.Children {
    return <tr>
      <th scope="row">{vnode.attrs.document.id}</th>
      <td>{vnode.attrs.document.author.name}</td>
      <td>{vnode.attrs.document.title}</td>
      <td>
        {Mithril(Mithril.route.Link, {
          href: LocationPath.Document,
          params: {
            id: vnode.attrs.document.id,
          }
        }, 'Открыть')}
      </td>
    </tr>;
  }
}