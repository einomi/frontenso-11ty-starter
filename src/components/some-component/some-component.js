/**
 * Example widget
 *
 * @class
 */
class SomeComponent {
  currentIndex = 0;
  timeout = 2000;

  constructor() {
    /** @type {HTMLElement[]} */
    this.itemArr = [];

    this.containerNode = document.querySelector('[data-widget]');
    if (!this.containerNode) {
      return;
    }
    const itemContainer = this.containerNode.querySelector(
      '[data-widget-items]'
    );
    if (!itemContainer) {
      return;
    }

    this.itemArr = /** @type {HTMLElement[]} */ (Array.from(
      itemContainer.children
    ));

    this.update();

    setInterval(() => {
      this.next();
    }, this.timeout);
  }

  /** @return {void} */
  next() {
    this.currentIndex =
      this.currentIndex < this.itemArr.length - 1 ? this.currentIndex + 1 : 0;
    this.update();
  }

  /** @return {void} */
  update() {
    this.itemArr.forEach((node) => {
      node.style.opacity = '0';
    });
    const currentItemNode = this.itemArr[this.currentIndex];
    currentItemNode.style.opacity = '1';
  }
}

export default new SomeComponent();
