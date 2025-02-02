import Mithril from 'mithril';
import InvoiceServicesListSectionComponent from './sections/invoice-services-list';
import NewServiceFormSectionComponent from './sections/new-service-form';
import { InvoiceServiceModel } from '../../model/invoice/service';

export type Attrs = {
};

export default class InvoiceServicesComponent implements Mithril.ClassComponent<Attrs> {

  private readonly services: InvoiceServiceModel[] = [];

  private onNewService(name: string, number: number, price: number): void {
    name = name.trim();
    if (name.length !== 0) {
      this.services.push({ name, number, price });
    }
  }

  public view(vnode: Mithril.Vnode<Attrs, this>): Mithril.Children {
    return <table class={this.constructor.name + ' table'}>
      <thead>
      <tr>
        <th scope="col">№</th>
        <th scope="col">Услуга</th>
        <th scope="col">Цена (руб.)</th>
        <th scope="col">Количество (шт./ед.)</th>
        <th scope="col">Сумма (руб.)</th>
      </tr>
      </thead>
      <InvoiceServicesListSectionComponent services={this.services} />
      <NewServiceFormSectionComponent onservicecreate={this.onNewService.bind(this)} />
    </table>;
  }
}