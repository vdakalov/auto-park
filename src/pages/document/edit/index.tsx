import Mithril from 'mithril';
import DefaultPage from '../../../libs/pages/default';
import FormControlComponent from '../../../components/form-control';
import AgentModelController from '../../../model/agent/controller';
import AgentsModelController from '../../../model/agents/controller';
import DocumentAcceptorsComponent from '../../../components/document-acceptors';
import { LocationPath } from '../../../libs/location-path';

export type Attrs = {
  id: string;
};

export default class DocumentEditPage extends DefaultPage<Attrs> {

  private documentAuthor: number = 0;
  private documentTitle: string = '';
  private documentContent: string = '';
  private readonly documentAcceptors: AgentsModelController = new AgentsModelController([], this.application.ctrl);

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

  private onChangeDocumentAcceptors(agents: AgentModelController[]): void {
    this.documentAcceptors.removeAllItems();
    for (const agent of agents) {
      this.documentAcceptors.addUniqueItem(agent);
    }
  }

  private onSaveDocument(): void {
    const document = this.ensurePageDocument();
    if (document !== undefined) {
      if (document.title !== this.documentTitle) {
        document.title = this.documentTitle;
      }
      if (document.content !== this.documentContent) {
        document.content = this.documentContent;
      }
      document.acceptors.adoptItems(this.documentAcceptors);
      this.setLocation(LocationPath.Document, {
        id: document.id.toString()
      });
    } else {
      this.setLocation(LocationPath.Documents, {});
    }
  }

  private onCancel(): void {
    const document = this.ensurePageDocument();
    if (document !== undefined) {
      this.setLocation(LocationPath.Document, {
        id: document.id.toString()
      });
    } else {
      this.setLocation(LocationPath.Documents, {});
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
      <h4>Стороны</h4>
      <p>Стороны соглашения, которые должны подписать документ</p>
      <FormControlComponent id="document-acceptors" label="Стороны">
        <DocumentAcceptorsComponent
          acceptors={this.application.agents.toArray()}
          selected={this.documentAcceptors.toArray()}
          onUpdate={this.onChangeDocumentAcceptors.bind(this)}
        />
      </FormControlComponent>
      <FormControlComponent>
        <button class="btn btn-primary" onclick={this.onSaveDocument.bind(this)}>Сохранить</button>
        <button class="btn btn-link" onclick={this.onCancel.bind(this)}>Отмена</button>
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
    this.documentAcceptors.adoptItems(document.acceptors);
  }
}
