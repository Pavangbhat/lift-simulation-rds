const createButton = (buttonText, buttonClass, callBack, attributes) => {
  const btn = document.createElement("button");
  btn.innerHTML = buttonText;
  btn.setAttribute("class", buttonClass);
  for (const key in attributes) {
    btn.setAttribute(key, attributes[key]);
  }
  btn.addEventListener("click", callBack);
  return btn;
};

const createLiftElement = (liftId) => {
  const liftElement = document.createElement("div");
  const doorContainer = document.createElement("div");

  liftElement.setAttribute("class", "lift");
  doorContainer.setAttribute("class", "door-container");

  liftElement.setAttribute("id", liftId);

  const leftDoor = document.createElement("span");
  const rightDoor = document.createElement("span");

  leftDoor.setAttribute("class", "left-door");
  rightDoor.setAttribute("class", "right-door");
  leftDoor.setAttribute("id", "left-door");
  rightDoor.setAttribute("id", "right-door");

  doorContainer.appendChild(leftDoor);
  doorContainer.appendChild(rightDoor);

  liftElement.appendChild(doorContainer);

  return liftElement;
};

const createFloorElement = (floorNumber) => {
  const floorElement = document.createElement("div");
  floorElement.setAttribute("class", "floor");
  floorElement.setAttribute("floor-number", floorNumber);
  return floorElement;
};

export const createView = (data, upCallback, downCallback) => {
  const { floors, lifts } = data;
  const floor = document.getElementById("floor");

  floors.forEach((floorItem, index) => {
    const floorNo = floorItem.floorNumber;
    const floorElement = createFloorElement(floorItem.floorNumber);

    const btnLiftWrapper = document.createElement("div");
    btnLiftWrapper.setAttribute("class", "btn-lift-wrapper");

    const btnContainer = document.createElement("div");
    btnContainer.setAttribute("class", "button-wrapper");
    const attributes = {
      floorNo,
    };

    if (index === 0) {
      btnContainer.appendChild(
        createButton("Down", "btn-down", upCallback, attributes)
      );
    } else if (index === floors.length - 1) {
      btnContainer.appendChild(
        createButton("Up", "btn-up", downCallback, attributes)
      );
    } else {
      btnContainer.appendChild(
        createButton("Up", "btn-up", upCallback, attributes)
      );
      btnContainer.appendChild(
        createButton("Down", "btn-down", downCallback, attributes)
      );
    }

    const liftContainer = document.createElement("div");
    liftContainer.setAttribute("class", "lift-wrapper");

    btnLiftWrapper.append(btnContainer, liftContainer);
    floorElement.appendChild(btnLiftWrapper);
    floor.appendChild(floorElement);
  });

  lifts.forEach((lift) => {
    const floorAttribute = `[floor-number="${lift.currentFloor}"]`;
    const floorElement = document.querySelector(floorAttribute);
    const liftWrapper = floorElement.querySelector(".lift-wrapper");
    liftWrapper.appendChild(createLiftElement(lift.liftId));
  });
};
