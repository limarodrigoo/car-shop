import Service, { ServiceError } from '.';
import { Car, carSchema } from '../interfaces/CarInterface';
import CarModel from '../models/CarsModel';

class CarService extends Service<Car> {
  constructor(model = new CarModel()) {
    super(model);
  }

  create = async (obj: Car): Promise<Car | null | ServiceError> => {
    const validated = carSchema.safeParse(obj);
    if (!validated.success) return { error: validated.error };
    return this.model.create(obj);
  };

  update = async (id: string, obj: Car): Promise<Car | null | ServiceError> => {
    const validated = carSchema.safeParse(obj);
    if (!validated.success) return { error: validated.error };
    return this.model.update(id, obj);
  };
}

export default CarService;
