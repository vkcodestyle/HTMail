/*
* Toggle button
*/
document.querySelector('.toggle-button').addEventListener('click', function() {
  document.querySelector('.content-main-wrap').classList.toggle('iframe-width')
})

/*
* Sidebar
*/
document.getElementById("nav-icon").addEventListener('click', function () {
  this.classList.toggle("open")
  document.querySelector(".content-sidebar").classList.toggle("active")
  document.querySelector(".content-main").classList.toggle("active")
})

/*
* Tab iFrame
*/
let Iframe = function(options) {
  let elem       = document.getElementById(options.elem),
    open         = options.open || 0,
    titleClass   = 'content-preview',
    activeClass  = 'content-preview-active',
    contentClass = 'content-main-frame',
    tabsNum      = elem.querySelectorAll('.' + titleClass).length;

  render();

  /**
   * Initial rendering of the tabs.
   */
  function render(n) {
    elem.addEventListener('click', onClick);

    let init = (n == null) ? checkTab(open) : checkTab(n);

    for (let i = 0; i < tabsNum; i++) {
      elem.querySelectorAll('.' + titleClass)[i].setAttribute('data-index', i);
      if (i === init) openTab(i);
    }
  }

  function onClick(e) {
    if (e.target.className.indexOf(titleClass) === -1) return;
    e.preventDefault();
    openTab(e.target.getAttribute('data-index'));
  }

  /**
   * Hide all tabs and re-set tab titles.
   */
  function reset() {
    [].forEach.call(elem.querySelectorAll('.' + contentClass), function(item) {
      item.style.display = 'none';
    });

    [].forEach.call(elem.querySelectorAll('.' + titleClass), function(item) {
      item.className = removeClass(item.className, activeClass);
    });
  }

  /**
   * Utility function to remove the open class from tab titles.
   *
   * @param {string} str - Current class.
   * @param {string} cls - The class to remove.
   */
  function removeClass(str, cls) {
    let reg = new RegExp('(\ )' + cls + '(\)', 'g');
    return str.replace(reg, '');
  }

  /**
   * Utility function to remove the open class from tab titles.
   *
   * @param n - Tab to open.
   */
  function checkTab(n) {
    return (n < 0 || isNaN(n) || n > tabsNum) ? 0 : n;
  }

  /**
   * Opens a tab by index.
   *
   * @param {number} n - Index of tab to open. Starts at 0.
   *
   * @public
   */
  function openTab(n) {
    reset();

    let i = checkTab(n);

    elem.querySelectorAll('.' + titleClass)[i].className += ' ' + activeClass;
    elem.querySelectorAll('.' + contentClass)[i].style.display = '';
  }

  /**
   * Updates the tabs.
   *
   * @param {number} n - Index of tab to open. Starts at 0.
   *
   * @public
   */
  function update(n) {
    destroy();
    reset();
    render(n);
  }

  /**
   * Removes the listeners from the tabs.
   *
   * @public
   */
  function destroy() {
    elem.removeEventListener('click', onClick);
  }

  return {
    open: openTab,
    update: update,
    destroy: destroy
  };
};

/*
* Tab init
*/
let iframe = new Iframe({
  elem: 'iframe',
  open: 0
});