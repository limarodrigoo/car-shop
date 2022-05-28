import { Model } from "mongoose";
import Sinon from "sinon";
import CarModel, { CarDocument } from "../../../models/CarsModel";
import { validCar, coverageCar } from "../../../../__tests__/utils/CarsMock";

const spyMethods = {
  create: Sinon.spy(),
  find: Sinon.spy(),
  findOne: Sinon.spy(),
  findByIdAndUpdate: Sinon.spy(),
  findByIdAndDelete: Sinon.spy(),
};

const modelMock = {
  create: spyMethods.create,
  find: spyMethods.find,
  findOne: spyMethods.findOne,
  findByIdAndUpdate: spyMethods.findByIdAndUpdate,
  findByIdAndDelete: spyMethods.findByIdAndDelete,
} as unknown as Model<CarDocument>;

const carModel = new CarModel(modelMock);

describe("CarModel", () => {
  describe("create", () => {
    it("test if create function has been called", async () => {

      await carModel.create(validCar);

      Sinon.assert.called(spyMethods.create);
    });
  });
  describe("find", () => {
    it("test if find function", async () => {
      await carModel.read();

      Sinon.assert.called(spyMethods.find);
    });
  });
  describe("findOne", () => {
    it("test if findOne function has been called", async () => {
      await carModel.readOne('2');

      Sinon.assert.called(spyMethods.findOne);
    });
  });
  describe("findByIdAndUpdate", () => {
    it("test if findByIdAndUpdate function has been called", async () => {
      await carModel.update('2', coverageCar);

      Sinon.assert.called(spyMethods.findByIdAndUpdate);
    });
  });
  describe("findByIdAndDelete", () => {
    it("test if findByIdAndDelete function has been called", async () => {
      await carModel.delete('2');

      Sinon.assert.called(spyMethods.findByIdAndDelete);
    });
  });
});
