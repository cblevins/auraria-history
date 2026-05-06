(function () {
  var el = document.getElementById("stop-map");
  if (!el || typeof L === "undefined") return;
  var lat = parseFloat(el.dataset.lat);
  var lng = parseFloat(el.dataset.lng);
  var label = el.dataset.label || "";
  var number = parseInt(el.dataset.number, 10) || 0;
  if (!isFinite(lat) || !isFinite(lng)) return;

  var map = L.map(el, { scrollWheelZoom: false }).setView([lat, lng], 17);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(map);

  // Faded markers for all other stops — drawn first so current stop renders on top
  var allStops = window._tourStops || [];
  allStops.forEach(function (stop) {
    if (stop.number === number) return;
    if (!Number.isFinite(stop.lat) || !Number.isFinite(stop.lng)) return;
    var fadedIcon = L.divIcon({
      className: "tour-number-marker tour-number-marker--faded",
      html: "<span>" + stop.number + "</span>",
      iconAnchor: [12, 12],
    });
    L.marker([stop.lat, stop.lng], { icon: fadedIcon })
      .addTo(map)
      .bindPopup(
        "<strong>Stop " +
          stop.number +
          (stop.title ? ": " + stop.title : "") +
          "</strong>" +
          (stop.location ? "<br>" + stop.location : "") +
          '<br><a href="' +
          stop.url +
          '">Go to stop &rarr;</a>',
      );
  });

  // Current stop — prominent marker drawn on top
  var icon = L.divIcon({
    className: "tour-number-marker",
    html: "<span>" + number + "</span>",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
  L.marker([lat, lng], { icon: icon, zIndexOffset: 1000 })
    .addTo(map)
    .bindPopup(
      "<strong>Stop " + number + (label ? ": " + label : "") + "</strong>",
    );

  window._stopMap = map;
})();
