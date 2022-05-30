import { Router } from 'express';
import Controller from '../controllers';
import IdMiddleware from '../middlewares';

class CustomRouter<T> {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRoute(controller: Controller<T>, route: string = controller.route) {
    this.router.post(route, controller.create);
    this.router.put(`${route}/:id`, IdMiddleware.validate, controller.update);
    this.router.delete(
      `${route}/:id`,
      IdMiddleware.validate,
      controller.delete,
    );
    this.router.get(`${route}/:id`, IdMiddleware.validate, controller.readOne);
    this.router.get(route, controller.read);
  }
}

export default CustomRouter;
