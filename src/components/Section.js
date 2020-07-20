export class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
  }
  renderAllItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }
  addItem(elem) {
    this._container.prepend(elem);
  }

}
