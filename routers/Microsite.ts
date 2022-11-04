import MicrositeController from "../controllers/Microsite";
import {Express} from "express"
import { body, query, param } from "express-validator";

export default class MicrositeRouter {
    #app: Express;
    #micrositeController: MicrositeController; 

    constructor(app: Express){
        this.#app = app;
        this.#micrositeController = new MicrositeController();
    }

    startRouting(): void{
        this.#app.get(
            '/api/microsites', 
            query('offset').isNumeric(),
            query('limit').isNumeric(),
            this.#micrositeController.getAll
        );

        this.#app.get(
            '/api/microsites/:typeId',
            param('typeId').isNumeric(),
            query('offset').isNumeric(),
            query('limit').isNumeric(),
            this.#micrositeController.getByTypeId
        );

        this.#app.post(
            '/api/microsites',
            body('name').isString(),
            body('url').isString(),
            body('typeId').isNumeric(),
            this.#micrositeController.save
        );

        this.#app.put(
            '/api/microsites/:id',
            param('id').isNumeric(),
            body('name').isString(),
            body('url').isString(),
            body('typeId').isNumeric(),
            this.#micrositeController.update
        );

        this.#app.delete(
            '/api/microsites/:id',
            param('id').isNumeric(),
            this.#micrositeController.delete
        );
    }
}