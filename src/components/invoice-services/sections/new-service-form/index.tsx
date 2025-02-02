import Mithril from 'mithril';

export type Attrs = {
  onservicecreate: (name: string, number: number, price: number) => void;
};

export default class NewServiceFormSectionComponent implements Mithril.ClassComponent<Attrs> {

  private name: string = '';

  private number: number = 0;

  private price: number = 0;


  private onChangeName(event: InputEvent): void {
    if (event.target instanceof HTMLInputElement) {
      this.name = event.target.value;
    }
  }

  private onChangeNumber(event: InputEvent): void {
    if (event.target instanceof HTMLInputElement) {
      this.number = Number.parseFloat(event.target.value);
    }
  }

  private onChangePrice(event: InputEvent): void {
    if (event.target instanceof HTMLInputElement) {
      this.price = Number.parseInt(event.target.value);
    }
  }

  private onAdd(callback: Attrs['onservicecreate']): void {
    callback(this.name, this.number, this.price);
    this.name = '';
    this.number = 0;
    this.price = 0;
  }

  public view(vnode: Mithril.Vnode<Attrs, this>): Mithril.Children {
    return <tbody class={this.constructor.name}>
    <tr>
      <th scope="row">#</th>
      <td>
        <input
          type="text"
          value={this.name}
          onchange={this.onChangeName.bind(this)}
        />
      </td>
      <td>
        <input
          type="number"
          min="0"
          step="0.01"
          value={this.number}
          onchange={this.onChangeNumber.bind(this)}
          />
      </td>
      <td>
        <input
          type="number"
          min="0"
          step="1"
          value={this.price}
          onchange={this.onChangePrice.bind(this)}
          />
      </td>
      <td>
        <button
          class="btn btn-second"
          onclick={this.onAdd.bind(this, vnode.attrs.onservicecreate)}
        >Добавить</button>
      </td>
    </tr>
    </tbody>;
  }
}