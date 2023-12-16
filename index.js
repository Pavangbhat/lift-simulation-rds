import store from "./store.js";
import { createView } from "./viewHelpers.js";

const animationDurationPerFloor = 2;

const getElements = (liftId) => {
  const liftElement = document.getElementById(liftId);
  const leftDoor = document.getElementById("left-door");
  const rightDoor = document.getElementById("right-door");
  return { liftElement, leftDoor, rightDoor };
};

const openCloseDoors = (liftId, isOpen) => {
  const { leftDoor, rightDoor } = getElements(liftId);
  leftDoor.classList.toggle("openOrClose", isOpen);
  rightDoor.classList.toggle("openOrClose", isOpen);
};

const determineNextLiftDirection = (liftId) => {
  const { currentFloor, assignedFloors } = store.getLiftById(liftId);
  const nextFloor = assignedFloors[0];
  if (nextFloor > currentFloor) return "UP";

  return "DOWN";
};

const moveAFloor = (liftId, direction) => {
  const { liftElement } = getElements(liftId);

  const liftData = store.getLiftById(liftId);
  const nextFloorNumber =
    direction === "UP" ? liftData.currentFloor + 1 : liftData.currentFloor - 1;
  const translateFloorPosition = `-${nextFloorNumber * 100}px`;
  liftElement.style.transform = `translateY(${translateFloorPosition})`;
  liftElement.style.transition = `transform ${animationDurationPerFloor}s linear`;

  const transitionEndHandler = (event) => {
    if (event.target === liftElement) {
      liftElement.removeEventListener("transitionend", transitionEndHandler);

      store.updateLiftProperty(liftId, "currentFloor", nextFloorNumber);

      if (!liftData.assignedFloors.length) {
        store.updateLiftProperty(liftId, "movingDirection", "STILL");
        return;
      }

      if (store.findAndUpdateAssignedFloor(liftId, nextFloorNumber)) {
        store.updateLiftProperty(liftId, "doorState", "OPEN");

        setTimeout(() => {
          openCloseDoors(liftId, true);
          store.updateLiftProperty(liftId, "doorState", "OPEN");
        });

        setTimeout(() => {
          openCloseDoors(liftId, false);
          store.updateLiftProperty(liftId, "doorState", "CLOSED");
        }, 2500);

        setTimeout(() => {
          if (liftData.assignedFloors.length) {
            const direction = determineNextLiftDirection(liftId);
            moveAFloor(liftId, direction);
          } else {
            store.updateLiftProperty(liftId, "movingDirection", "STILL");
          }
        }, 5000);
      } else if (
        liftData.assignedFloors.length &&
        liftData.doorState === "CLOSED"
      ) {
        const direction = determineNextLiftDirection(liftId);
        store.updateLiftProperty(liftId, "doorState", "CLOSED");
        store.updateLiftProperty(liftId, "movingDirection", direction);
        moveAFloor(liftId, direction);
      }
    }
  };

  liftElement.addEventListener("transitionend", transitionEndHandler);
};

const moveDownAFloor = (liftId) => {};

const liftScheduler = (floorNo) => {
  return store.getLiftById("234234asdf");
};

const upCallback = (event) => {
  const floorNo = Number(event.target.attributes.floorno.value);
  const { liftId, movingDirection, doorState, assignedFloors, currentFloor } =
    liftScheduler(floorNo);
  console.log(movingDirection, assignedFloors);

  if (assignedFloors.includes(floorNo)) {
    return;
  }
  store.addFloorItem(liftId, floorNo);

  if (movingDirection === "STILL" && doorState === "CLOSED") {
    const direction = determineNextLiftDirection(liftId);

    store.updateLiftProperty(liftId, "movingDirection", direction);
    moveAFloor(liftId, direction);
  }
};

const downCallback = (event) => {
  const floorNo = Number(event.target.attributes.floorno.value);
  const { liftId, movingDirection, doorState } = liftScheduler(floorNo);
  store.addFloorItem(liftId, floorNo);
  if (movingDirection === "STILL" && doorState === "CLOSED") {
    store.updateLiftProperty(liftId, "movingDirection", "DOWN");
    moveDownAFloor(liftId);
  }
};

createView(store.data, upCallback, downCallback);
