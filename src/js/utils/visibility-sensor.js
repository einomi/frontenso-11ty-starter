/** @typedef {object} VisibilitySensorEntry
 * @property {HTMLElement} node
 * @property {Function} cb
 * */

/**
 * @class
 */
class VisibilitySensor {
  /** @type {VisibilitySensorEntry[]} */
  added = [];

  constructor() {
    this.observer = new IntersectionObserver(this.update, {
      rootMargin: '0px 0px -30% 0px',
    });
  }

  /**
   * @param {any[]} entries
   */
  update = (entries) => {
    entries.forEach((entry) => {
      const cb = this.added.find((v) => {
        return v.node === entry.target;
      })?.cb;
      cb && cb({ isVisible: entry.isIntersecting });
    });
  };

  /**
   * @param {HTMLElement} node
   * @param {Function} cb
   */
  observe(node, cb) {
    this.observer.observe(node);
    this.added.push({ cb, node });
  }

  /**
   * @param {HTMLElement} node
   */
  unobserve(node) {
    this.observer.unobserve(node);
    node.querySelector('.cad');
    this.added = this.added.filter((v) => v.node !== node);
  }
}

const visibilitySensor = new VisibilitySensor();

export default visibilitySensor;
