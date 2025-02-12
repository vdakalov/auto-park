import RefModelController from '../../libs/model-controller/ref';
import { DocumentModel } from '.';
import ApplicationModelController from '../application/controller';
import AgentModelController from '../agent/controller';
import AgentsModelController from '../agents/controller';
import Exception from '../../libs/exception';

export enum DocumentExceptionCode {
  NoAuthorAgent = 1,
  NoAcceptorAgent = 2,
}

export class DocumentException extends Exception {
}

export default class DocumentModelController extends RefModelController<DocumentModel> {
  public static createModel(author: number): DocumentModel {
    return {
      id: this.getNextId(),
      title: '',
      content: '',
      author,
      acceptors: []
    };
  }

  public static create(author: number, applicationModelController: ApplicationModelController): DocumentModelController {
    return new this(this.createModel(author), applicationModelController);
  }

  public get id(): number {
    return this.model.id;
  }

  public readonly author: AgentModelController;

  public get title(): string {
    return this.model.title;
  }

  public set title(value: string) {
    this.model.title = value;
  }

  public get content(): string {
    return this.model.content;
  }

  public set content(value: string) {
    this.model.content = value;
  }

  public readonly acceptors: AgentsModelController;

  constructor(documentModel: DocumentModel, applicationModelController: ApplicationModelController) {
    super(documentModel, applicationModelController, documentModel.id);

    const agent = this.applicationModelController.agents
      .get(this.model.author);
    if (!agent) {
      throw new DocumentException(`No document author found: author-id=${this.model.author}`,
        DocumentExceptionCode.NoAuthorAgent);
    }
    this.author = agent;

    this.acceptors = new AgentsModelController([], applicationModelController);

    for (const id of this.model.acceptors) {
      const agent = this.applicationModelController.agents.get(id);
      if (agent === undefined) {
        throw new DocumentException(`No document (id=${this.model.id}) acceptor: id=${id}`,
          DocumentExceptionCode.NoAcceptorAgent);
      }
      this.acceptors.addUniqueItem(agent);
    }
  }
}
