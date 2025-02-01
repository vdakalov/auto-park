import Mithril from 'mithril';
import InvoiceServiceModelController from '../../../../model/invoice/service/controller';
import InvoiceServiceItemComponent from './item';

export type Attrs = {
  services: InvoiceServiceModelController[];
};

export default class InvoiceServicesListSectionComponent implements Mithril.ClassComponent<Attrs> {
  public view(vnode: Mithril.Vnode<Attrs, this>): Mithril.Children {
    return <tbody>
    {vnode.attrs.services.map((service, index) =>
      <InvoiceServiceItemComponent key={service.name} index={index} service={service} />)}
    </tbody>;
  }
}