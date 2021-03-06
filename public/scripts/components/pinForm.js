$(() => {
  window.pinForm = {};

  // isNew is boolean to differentiate if a new pin is being created or editing existing info
  // the values and the conditionals at the top are so we can reuse the form for edit as well.

  const createForm = function(pin) {
    const long = pin.longitude;
    const lat = pin.latitude;
    const id = !pin ? '' : pin.id;
    const name = !pin ? '': pin.title;
    const desc = !pin ? '': pin.description;
    const imgUrl = !pin ? '' : pin.img_url;

    console.log(id, long, lat, name, desc, imgUrl);

    return `
    <article class="pinForm">
      <section class="d-flex justify-content-center my-3">
        <form action="/api/pin" method="" id="pin-Form" value="${id}">
          <div class="form-group">
            <label for="pin-title">Name</label>
            <input type="text" name="title" class="form-control" placeholder="Enter place name"  id="new-pin-name" value="${name}">
          </div>
          <div class="form-group">
            <label for="pin-description">Description</label>
            <input type="text" name="description" class="form-control" placeholder="Describe this location" id="new-pin-desc" value="${desc}">
          </div>
          <div class="form-group">
            <label for="pin-img_url">Location Image</label>
            <input type="url" name="img_url" class="form-control" placeholder="http://" id="new-pin-img-url" value="${imgUrl}">
          </div>

          <div class="new-pin-long" id="${long}">
          <div class="new-pin-lat" id="${lat}">
          ${!id ?
            `<button type="submit" class="btn btn-primary add-pin-detail" name="btnMethod" value="put">Add Pin!</button>`
            : `<button type="submit" class="btn btn-primary edit-pin-detail" name="btnMethod" value="patch">Save Changes</button>
          `}
            <button class="btn btn-primary" id="cancel-pin-detail-edit">Cancel</button>
          </div>
          </div>

        </form>
      </section>
    </article>
    `;
  };

  window.pinForm.createForm = createForm;
});

  // function for making pin form html
  // const pinForm = function() {
  //   clearList();
  //   const entry = window.pinForm.createForm(true);
  //   $mapList.append(entry);

  // };

  // $main.append($mapList);
  // pinForm();
