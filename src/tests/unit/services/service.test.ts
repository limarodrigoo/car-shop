import { expect } from "chai";
import CarService from "../../../services/CarService";
import {
  carDoorsLtTwo,
  coverageCar,
} from "../../../../__tests__/utils/CarsMock";
import Sinon from "sinon";
import { carSchema } from "../../../interfaces/CarInterface";
import CarModel from "../../../models/CarsModel";

const carModel = new CarModel();

const carService = new CarService(carModel);

describe("CarService", () => {
  describe("create with invalid input", () => {
    let parseStub: Sinon.SinonStub;
    before(() => {
      parseStub = Sinon.stub(carSchema, "safeParse").resolves(false);
    });
    after(() => {
      parseStub.restore();
    });
    it("if invalid input is used", async () => {
      const result = await carService.create(carDoorsLtTwo);

      expect(result).to.haveOwnProperty("error");
    });
  });
  describe("read", () => {
    let readStub: Sinon.SinonStub;

    before(() => {
      readStub = Sinon.stub(carModel, "read").resolves([coverageCar]);
    });
    after(() => {
      readStub.restore();
    });
    it('returns an array of objects', async () => {
      const result = await carService.read();
      expect(result[0]).to.be.equal(coverageCar)
    });
  });
  describe("readOne", () => {
    let readStub: Sinon.SinonStub;

    before(() => {
      readStub = Sinon.stub(carModel, "readOne").resolves(coverageCar);
    });
    after(() => {
      readStub.restore();
    });
    it('returns an object', async () => {
      const result = await carService.readOne('32');
      expect(result).to.be.equals(coverageCar);
    });
  });
});
