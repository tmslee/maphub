$(() => {
  window.pinList = {};
  const createPinItem = function (pin, state) {
    let editRemoveBtn = ``;
    if (state === 'editDetail') {
      editRemoveBtn = `
      <div class="col">
        <button id="pin-edit-prompt">edit</button>
        <button id="pin-remove">remove</button>
      </div>
      `;
    }

    return `
      <div class="container row pin-item" id="${pin.id}">
        <div class="col pin-title">${pin.title}</div>
        ${editRemoveBtn}
      </div>
    `;
  };

  const createPinList = function(pins, state) {
    let pinList = '';
    for (const pin of pins) {
      pinList += `
        ${createPinItem(pin, state)}
      `;
    }

    let addBtn = '';
    if (state === 'editDetail') {
      addBtn = `<button class="btn btn-primary" id="pin-add-prompt">add a new pin</button>`;
    }

    let pinContainer = `
      <div class="container" id="pin-list">
        <div>All pins</div>
        ${pinList}
        ${addBtn}
      </div>
    `;
    return pinContainer;
  }

  window.pinList.createPinList = createPinList;
});