import Mithril from 'mithril';
import DefaultPage from '../../../libs/pages/default';
import FormControlComponent from '../../../components/form-control';
import AgentModelController from '../../../model/agent/controller';
import { Agent } from '../../../components/agent-select';

export type Attrs = {
  id: string;
};

export default class DocumentEditPage extends DefaultPage<Attrs> {

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

  protected render(vnode: Mithril.Vnode<Attrs, this>): Mithril.Children {
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
    </div>
  }

  public oninit(vnode: Mithril.Vnode<Attrs, this>): void {
    super.oninit(vnode);
    const document = this.ensurePageDocument();
    this.title = document.title;
    this.documentAuthor = document.author.id;
    this.documentTitle = document.title;
    this.documentContent = document.content;
  }
}