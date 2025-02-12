import Mithril from 'mithril';
import DefaultPage from '../../../libs/pages/default';
import AgentModelController from '../../../model/agent/controller';
import { Agent } from '../../../components/agent-select';
import DocumentAcceptorsComponent from '../../../components/document-acceptors';
import DocumentModelController from '../../../model/document/controller';
import { LocationPath } from '../../../libs/location-path';
import FormControlComponent from '../../../components/form-control';

export type Attrs = {};

export default class DocumentCreatePage extends DefaultPage<Attrs> {

  public title = 'Новый документ';

  private documentAuthor: number = 0;
  private documentTitle: string = '';
  private documentContent: string = '';
  private documentAcceptors: AgentModelController[] = [];

  private onChangeDocumentTitle(event: InputEvent): void {
    if (event.target instanceof HTMLInputElement) {
      this.documentTitle = event.target.value;
    }
  }

  private onChangeDocumentContent(event: InputEvent): void {
    if (event.target instanceof HTMLTextAreaElement) {
      this.documentContent = event.target.value;
    }
  }

  private onUpdateDocumentAcceptors(selected: AgentModelController[]): void {
    this.log.info('onUpdateDocumentAcceptors', { selected });
  }

  private onSelectDocumentAcceptor(agent: Agent): void {
    this.log.info('Selected', agent);
    const ctrl = this.application.agents.get(agent.id);
    if (ctrl !== undefined && this.documentAcceptors.indexOf(ctrl) === -1) {
      this.documentAcceptors.push(ctrl);
    }
  }

  private onRemoveDocumentAcceptor(id: number): void {
    this.log.debug('onRemoveDocumentAcceptor', { id });
    const index = this.documentAcceptors
      .findIndex(ctrl => ctrl.id === id);
    if (index !== -1) {
      this.documentAcceptors.splice(index, 1);
    }
  }

  private onCreateDocument(): void {
    const model = DocumentModelController.createModel(1);
    model.title = this.documentTitle;
    model.content = this.documentContent;
    model.acceptors = this.documentAcceptors.map(({ id }) => id);
    this.application.update(a => a.documents.add(model));
    this.log.debug('Created', { model });
    this.documentTitle = '';
    this.documentContent = '';
    this.documentAcceptors.length = 0;
    this.setLocation(LocationPath.Documents, {});
  }

  protected render(vnode: Mithril.Vnode<Attrs, this>): Mithril.Children {
    const acceptors = this.application.agents.toArray();
    const selected = this.documentAcceptors;

    return <div>
      <FormControlComponent id="document-title" label="Название документа">
        <input
          type="text"
          class="form-control"
          id="document-title"
          value={this.documentTitle}
          onchange={this.onChangeDocumentTitle.bind(this)}
        />
      </FormControlComponent>
      <FormControlComponent id="document-content" label="Содержание документа">
        <textarea
          class="form-control"
          id="document-content"
          rows="6"
          onchange={this.onChangeDocumentContent.bind(this)}
        >{this.documentContent}</textarea>
      </FormControlComponent>

      <h4>Стороны</h4>
      <div class="mb-3">
        <DocumentAcceptorsComponent
          acceptors={acceptors}
          selected={selected}
          onUpdate={this.onUpdateDocumentAcceptors.bind(this)}/>
      </div>
      <div class="mb-3">
        <button
          class="btn btn-primary"
          onclick={this.onCreateDocument.bind(this)}
        >Создать</button>
      </div>
    </div>;
  }
}
