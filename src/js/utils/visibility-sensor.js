/** @callback Callback
 * @param {{isVisible: boolean}} visibilityParams
 * @returns {void}
 *  */

/** @typedef {object} VisibilitySensorEntry
 * @property {Element} node
 * @property {Callback} cb
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
      rootMargin: '-10% 0px -50% 0px',
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
   * @param {Element} node
   * @param {Callback} cb
   */
  observe(node, cb) {
    this.observer.observe(node);
    this.added.push({ cb, node, once: false });
  }

  /**
   * @param {Element} node
   * @param {Callback} cb
   */
  observeOnce(node, cb) {
    this.observer.observe(node);
    this.added.push({ cb, node, once: true });
  }

  /**
   * @param {Element} node
   */
  unobserve(node) {
    this.observer.unobserve(node);
    this.added = this.added.filter((val) => val.node !== node);
  }
}

const visibilitySensor = new VisibilitySensor();

export default visibilitySensor;
