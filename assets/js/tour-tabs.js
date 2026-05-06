(function () {
  var tablist = document.querySelector(".tour-landing-tablist");
  if (!tablist) return;
  var tabs = Array.prototype.slice.call(
    tablist.querySelectorAll('[role="tab"]'),
  );
  if (!tabs.length) return;

  function activate(target, focusIt) {
    tabs.forEach(function (tab) {
      var selected = tab === target;
      tab.setAttribute("aria-selected", selected ? "true" : "false");
      tab.tabIndex = selected ? 0 : -1;
      var panel = document.getElementById(tab.getAttribute("aria-controls"));
      if (panel) panel.hidden = !selected;
    });
    if (focusIt) target.focus();
    if (target.id === "tour-tab-map" && window._tourLandingMap) {
      setTimeout(function () {
        window._tourLandingMap.invalidateSize();
      }, 0);
    }
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      activate(tab, true);
    });
    tab.addEventListener("keydown", function (event) {
      var next = null;
      if (event.key === "ArrowRight") next = tabs[(index + 1) % tabs.length];
      else if (event.key === "ArrowLeft")
        next = tabs[(index - 1 + tabs.length) % tabs.length];
      else if (event.key === "Home") next = tabs[0];
      else if (event.key === "End") next = tabs[tabs.length - 1];
      if (next) {
        event.preventDefault();
        activate(next, true);
      }
    });
  });
})();
