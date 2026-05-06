(function () {
  var el = document.getElementById("stop-map");
  if (!el || typeof L === "undefined") return;
  var lat = parseFloat(el.dataset.lat);
  var lng = parseFloat(el.dataset.lng);
  var label = el.dataset.label || "";
  var number = el.dataset.number || "";
  if (!isFinite(lat) || !isFinite(lng)) return;
  var map = L.map(el, { scrollWheelZoom: false }).setView([lat, lng], 17);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(map);
  var icon = L.divIcon({
    className: "tour-number-marker",
    html: "<span>" + number + "</span>",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
  L.marker([lat, lng], { icon: icon })
    .addTo(map)
    .bindPopup(
      "<strong>Stop " + number + (label ? ": " + label : "") + "</strong>",
    );
  window._stopMap = map;
})();
