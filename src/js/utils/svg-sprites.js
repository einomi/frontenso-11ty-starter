(function (doc) {
  const scripts = doc.getElementsByTagName('script');
  const script = scripts[scripts.length - 1];
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    const div = doc.createElement('div');
    div.innerHTML = this.responseText;
    div.style.display = 'none';
    if (!script || !script.parentNode) {
      return;
    }
    script.parentNode.insertBefore(div, script);
  };
  xhr.open('get', 'assets/svg/sprite.svg', true);
  xhr.send();
})(document);
