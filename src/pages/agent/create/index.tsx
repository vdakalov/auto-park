import Mithril from 'mithril';
import DefaultLayout from '../../../layouts/default';
import Page from '../../../libs/page';
import AgentModelController from '../../../model/agent/controller';
import { Path } from '../../../libs/router';

export default class AgentCreatePage extends Page implements Mithril.ClassComponent {
  public title = 'Новый агент';

  private name: string = '';
  private legalName: string = '';
  private legalInn: number = 0;

  private onNameChanged(event: InputEvent): void {
    if (event.target instanceof HTMLInputElement) {
      this.name = event.target.value.trim();
    }
  }

  private onLegalNameChanged(event: InputEvent): void {
    if (event.target instanceof HTMLInputElement) {
      this.legalName = event.target.value.trim();
    }
  }

  private onLegalInnChanged(event: InputEvent): void {
    if (event.target instanceof HTMLInputElement) {
      this.legalInn = event.target.valueAsNumber;
    }
  }

  private onCreate(): void {
    const agentModel = AgentModelController
      .create(this.name, this.legalName, this.legalInn);
    this.application.update(({ agents }) => agents.add(agentModel));
    Mithril.route.set(Path.Agents);
  }

  public view(vnode: Mithril.Vnode<{}, this>): Mithril.Children {
    return <DefaultLayout page={this}>
      <div class="mb-3">
        <label htmlFor="name" class="form-label">Пользовательское имя</label>
        <input
          id="name"
          type="email"
          class="form-control"
          autocomplete="off"
          placeholder="Основной агент"
          oninput={this.onNameChanged.bind(this)}
        />
      </div>
      <div class="mb-3">
        <label htmlFor="legal-name" class="form-label">Юридическое наименование</label>
        <input
          id="legal-name"
          type="text"
          class="form-control"
          autocomplete="off"
          placeholder="ООО &quot;AAA&quot;"
          oninput={this.onLegalNameChanged.bind(this)}
        />
      </div>
      <div class="mb-3">
        <label htmlFor="legal-inn" class="form-label">ИНН</label>
        <input
          id="legal-inn"
          type="number"
          class="form-control"
          autocomplete="off"
          oninput={this.onLegalInnChanged.bind(this)}
        />
      </div>
      <div class="mb-3">
        <button class="btn btn-primary" onclick={this.onCreate.bind(this)}>Создать</button>
      </div>
    </DefaultLayout>
  }
}