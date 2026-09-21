// =================================================================
// Gil & Go — keep the searched location across belts
// Load LAST in index.html (after every other script):
//   <script src="keep-location.js?v=1"></script>
// =================================================================
(function () {
  if (typeof window.loadNearbyDiscoveries !== "function" || typeof window.loadTheme !== "function") {
    console.warn("[keep-location] load this file after nearby-filters.js");
    return;
  }

  let saved = null; // { lat, lng, text }

  function inputBox() {
    try { if (typeof locationInput !== "undefined" && locationInput) return locationInput; } catch (e) {}
    return document.querySelector('input[placeholder*="Where"], #locationInput');
  }

  // Remember every location that gets searched
  const prevSearch = window.loadNearbyDiscoveries;
  window.loadNearbyDiscoveries = function (theme, lat, lng) {
    if (lat != null && lng != null) {
      const box = inputBox();
      saved = { lat: lat, lng: lng, text: box ? box.value : "" };
    }
    return prevSearch.apply(this, arguments);
  };

  // After a belt change, search the same location again
  const prevLoadTheme = window.loadTheme;
  window.loadTheme = function (theme) {
    const keep = saved;
    const result = prevLoadTheme.apply(this, arguments);
    if (!keep) return result;

    Promise.resolve(result).then(() => {
      setTimeout(() => {
        const box = inputBox();
        if (box && keep.text && !box.value) box.value = keep.text;
        try {
          if (typeof map !== "undefined" && map && window.kakao) {
            map.setCenter(new kakao.maps.LatLng(keep.lat, keep.lng));
          }
        } catch (e) {}
        window.loadNearbyDiscoveries(theme, keep.lat, keep.lng);
      }, 60);
    });
    return result;
  };

  console.log("[keep-location] loaded");
})();
