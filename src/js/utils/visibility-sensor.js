/** @typedef {object} VisibilitySensorEntry
 * @property {HTMLElement} node
 * @property {Function} cb
 * @property {boolean} once
 * */

/**
 * @class
 */
class VisibilitySensor {
  /** @type {VisibilitySensorEntry[]} */
  added = [];

  constructor() {
    this.observer = new IntersectionObserver(this.update, {
      rootMargin: '0px 0px -50% 0px',
    });
  }

  /**
   * @param {any[]} entries
   */
  update = (entries) => {
    entries.forEach((entry) => {
      const addedObj = this.added.find((val) => {
        return val.node === entry.target;
      });

      const cb = addedObj?.cb;

      if (addedObj?.once && entry.isIntersecting) {
        this.added = this.added.filter((val) => val.node !== entry.target);
      }

      cb && cb({ isVisible: entry.isIntersecting });
    });
  };

  /**
   * @param {HTMLElement} node
   * @param {Function} cb
   */
  observe(node, cb) {
    this.observer.observe(node);
    this.added.push({ cb, node, once: false });
  }

  /**
   * @param {HTMLElement} node
   * @param {Function} cb
   */
  observeOnce(node, cb) {
    this.observer.observe(node);
    this.added.push({ cb, node, once: true });
  }

  /**
   * @param {HTMLElement} node
   */
  unobserve(node) {
    this.observer.unobserve(node);
    this.added = this.added.filter((val) => val.node !== node);
  }
}

const visibilitySensor = new VisibilitySensor();

export default visibilitySensor;
