export enum LocationPath {
  // Common
  Index = '/',
  Exception = '/oops',

  // Agents
  Agents = '/agents',

  // Agent
  AgentCreate = '/agent/create',
  AgentEdit = '/agent/:id/edit',
  Agent = '/agent/:id',

  // Invoices
  Invoices = '/invoices',

  // Invoice
  InvoiceCreate = '/invoice/create',
}
