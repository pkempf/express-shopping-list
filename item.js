const items = require("./fakeDb");

class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;
    items.push(this);
  }

  static all() {
    return items;
  }

  static get(name) {
    let target = items.find((v) => v.name === name);
    if (target === undefined) {
      throw { message: "Item not found", status: 404 };
    }
    return target;
  }

  static update(name, data) {
    let target = items.find((v) => v.name === name);
    if (target === undefined) {
      throw { message: "Item not found", status: 404 };
    }

    target.name = data.name;
    target.price = data.price;

    return target;
  }

  static delete(name) {
    let targetIndex = items.findIndex((v) => v.name === name);
    if (targetIndex === -1) {
      throw { message: "Item not found", status: 404 };
    }
    items.splice(targetIndex, 1);
  }
}

module.exports = Item;
