class Store {
  constructor(init) {
    this.data = init;
  }

  consoleLiftProperty(liftId, fieldName) {
    const lift = this.getLiftById(liftId);
    console.log(lift[fieldName]);
  }

  consoleData() {
    // console.log(this.data);
  }

  getLiftById(liftId) {
    return this.data.lifts.find((lift) => {
      return lift.liftId === liftId;
    });
  }

  updateLiftProperty(liftId, fieldName, value) {
    const lift = this.getLiftById(liftId);
    lift[fieldName] = value;
    this.consoleData();
  }

  addFloorItem(liftId, floorNo) {
    const lift = this.getLiftById(liftId);
    lift.assignedFloors.push(floorNo);
    this.consoleData();
  }

  RemoveFloorItem(liftId, floorNo) {
    const lift = this.getLiftById(liftId);
    lift.assignedFloors.shift();
    this.consoleData();
  }

  findAndUpdateAssignedFloor(liftId, currentFloor) {
    const { assignedFloors } = this.getLiftById(liftId);

    const index = assignedFloors.indexOf(currentFloor);

    if (index !== -1) {
      this.updateLiftProperty(
        liftId,
        assignedFloors,
        assignedFloors.splice(index, 1)
      );
      return true;
    }

    return false;
  }
}

export default new Store({
  floors: [
    {
      floorId: "qwafsd21",
      floorNumber: 4,
    },
    {
      floorId: "qwafsd21",
      floorNumber: 3,
    },
    {
      floorId: "qwafsd21",
      floorNumber: 2,
    },
    {
      floorId: "qwafsd21",
      floorNumber: 1,
    },
    {
      floorId: "qwafsd21",
      floorNumber: 0,
    },
  ],
  lifts: [
    {
      currentFloor: 0,
      doorState: "CLOSED",
      movingDirection: "STILL",
      assignedFloors: [],
      liftId: "234234asdf",
    },
  ],
});
