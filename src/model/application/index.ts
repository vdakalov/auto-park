import { AgentsModel } from '../agents';
import { InvoicesModel } from '../invoices';

export type ApplicationModel = {
  agents: AgentsModel;
  invoices: InvoicesModel;
};