import Mithril from 'mithril';
import { InvoiceServiceModel } from '../../../../model/invoice/service';

export type Attrs = {
  index: number;
  service: InvoiceServiceModel;
};

export default class InvoiceServiceItemComponent implements Mithril.ClassComponent<Attrs> {
  public view(vnode: Mithril.Vnode<Attrs, this>): Mithril.Children {
    return <tr>
      <th scope="row">{vnode.attrs.index + 1}</th>
      <td>{vnode.attrs.service.name}</td>
      <td>{vnode.attrs.service.price}</td>
      <td>{vnode.attrs.service.number}</td>
      <td>{vnode.attrs.service.price * vnode.attrs.service.number}</td>
    </tr>;
  }
}