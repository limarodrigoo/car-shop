import { expect } from "chai";
import CarService from "../../../services/CarService";
import {
  carDoorsLtTwo,
} from "../../../../__tests__/utils/CarsMock";
import Sinon from "sinon";
import { carSchema } from "../../../interfaces/CarInterface";
import CarModel from '../../../models/CarsModel';

const carService = new CarService();

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
  
});
