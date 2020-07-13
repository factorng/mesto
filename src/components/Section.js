export class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }
  renderAllItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
  addItem(elem) {
    this._container.prepend(elem);
  }

}