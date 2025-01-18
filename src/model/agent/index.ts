import { LegalEntityModel } from '../legal-entity';

export type AgentModel = {
  id: number;
  name: string;
  legalEntity: LegalEntityModel;
};