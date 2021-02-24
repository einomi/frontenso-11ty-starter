/**
 * @return {{unlock: Function, lock: Function} | null}
 */
function ScrollLocker() {
  if (typeof document == 'undefined') {
    return null;
  }

  const element = document.body;

  /**
   * @return {void}
   */
  function lock() {
    element.style.overflow = 'hidden';
  }

  /**
   * @return {void}
   */
  function unlock() {
    element.style.overflow = '';
  }

  return {
    lock,
    unlock,
  };
}

const scrollLocker = ScrollLocker();

export default scrollLocker;
