import { Request, Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import CarService from '../services/CarService';
import { Car } from '../interfaces/CarInterface';

class CarController extends Controller<Car> {
  private _route: string;

  constructor(route: string, service = new CarService()) {
    super(service);
    this._route = route;
  }

  get route() {
    return this._route;
  }

  create = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ) => {
    const { body } = req;
    try {
      const car = await this.service.create(body);
      if (!car) {
        return res.status(500).json({ error: this.errors.internal });
      }
      if ('error' in car) {
        return res.status(400).json(car);
      }
      return res.status(201).json(car);
    } catch (e) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  readOne = async (req: Request, res: Response<Car | ResponseError>) => {
    const { id } = req.params;
    try {
      const car = await this.service.readOne(id);
      if (!car) {
        return res.status(404).json({ error: this.errors.notFound });
      }
      return res.status(200).json(car);
    } catch (e) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  update = async (req: Request, res: Response<Car | ResponseError>) => {
    const { id } = req.params;
    const { body } = req;
    try {
      const car = await this.service.update(id, body);
      if (!car) {
        return res.status(404).json({ error: this.errors.notFound });
      }
      if ('error' in car) {
        return res.status(400).json(car);
      }
      return res.status(200).json(car);
    } catch (e) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  delete = async (req: Request, res: Response<Car | ResponseError>) => {
    const { id } = req.params;
    try {
      const car = await this.service.delete(id);
      if (!car) {
        return res.status(404).json({ error: this.errors.notFound });
      }
      return res.status(204).json(car);
    } catch (e) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}

export default CarController;
