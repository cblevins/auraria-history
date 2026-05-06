(function () {
  var el = document.getElementById("tour-map");
  if (!el || typeof L === "undefined") return;
  var stops = window._tourStops || [];
  if (!stops.length) return;

  var map = L.map(el, { scrollWheelZoom: false });
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(map);

  var bounds = [];
  stops.forEach(function (stop) {
    if (!Number.isFinite(stop.lat) || !Number.isFinite(stop.lng)) return;
    var icon = L.divIcon({
      className: "tour-number-marker",
      html: "<span>" + stop.number + "</span>",
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
    L.marker([stop.lat, stop.lng], { icon: icon })
      .addTo(map)
      .bindPopup(
        "<strong>Stop " + stop.number + ": " + stop.title + "</strong>" +
        (stop.location ? "<br>" + stop.location : "") +
        '<br><a href="' + stop.url + '">Open stop &rarr;</a>'
      );
    bounds.push([stop.lat, stop.lng]);
  });
  if (bounds.length) {
    map.fitBounds(bounds, { padding: [28, 28], maxZoom: 17 });
  }
  window._tourLandingMap = map;
})();
