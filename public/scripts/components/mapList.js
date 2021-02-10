$(() => {
  window.mapList = {};

  const $mapList = $(`
  <section class="map-list" id="map-list">
    <p>Loading...</p>
  </section>
  `);

  window.$mapList = $mapList;

  function clearList() {
    $mapList.empty();
  }

  const addMapEntries = function(data) {
    clearList();
    for (const mapRow of data) {
      const entry = window.mapEntry.createMapEntry(mapRow);
      $mapList.append(entry);
    }
  };

  //===============================
  // initializing global vars
  window.currentMap = {};
  window.currentUser = null;
  //===============================

  $(document).on('click','.mapEntry', function(event) {
    const mapId = $(this).attr('id');
    event.preventDefault();
    Promise.all([getMapById(`id=${mapId}`), getCurrentUser()])
    .then((output) => {
      const map = output[0]
      const currentUser = 1;
      window.currentUser = currentUser;
      window.currentMap = map;

      window.$mapView.displayMapView(map, currentUser, 'view');
      window.views_manager.show('mapDetails');
    })
  });

  window.mapList.addMapEntries = addMapEntries;

});
