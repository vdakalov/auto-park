import { AgentsModel } from '../agents';
import { InvoicesModel } from '../invoices';
import { DocumentsModel } from '../documents';

export type ApplicationModel = {
  agents: AgentsModel;
  invoices: InvoicesModel;
  documents: DocumentsModel;
};