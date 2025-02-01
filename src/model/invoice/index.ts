
import { InvoiceServiceModel } from './service';

export type InvoiceModel = {
  id: number;
  agent: number;
  services: InvoiceServiceModel[];
};