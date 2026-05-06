(function () {
  var lightbox = document.getElementById("lightbox");
  if (!lightbox) return;
  var imgEl = lightbox.querySelector(".lightbox-img");
  var closeBtn = lightbox.querySelector(".lightbox-close");
  var lastFocus = null;

  function open(src, alt) {
    lastFocus = document.activeElement;
    imgEl.src = src;
    imgEl.alt = alt || "";
    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
    closeBtn.focus();
  }
  function close() {
    lightbox.hidden = true;
    imgEl.src = "";
    document.body.classList.remove("lightbox-open");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  document.querySelectorAll(".lightbox-trigger").forEach(function (btn) {
    btn.addEventListener("click", function () {
      open(btn.dataset.lightboxSrc, btn.dataset.lightboxAlt);
    });
  });
  closeBtn.addEventListener("click", close);
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) close();
  });
  document.addEventListener("keydown", function (e) {
    if (!lightbox.hidden && e.key === "Escape") close();
  });
})();
