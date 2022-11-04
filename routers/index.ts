import MicrositeRouter from "./Microsite";
import {Express} from "express"

export default class Routers{
    #app: Express
    #micrositeRouter: MicrositeRouter
    
    constructor(app: Express){
        this.#app = app;
        this.#micrositeRouter = new MicrositeRouter(this.#app);
    }

    startRouters(): void{
        this.#micrositeRouter.startRouting();
    }
}