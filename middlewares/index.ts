import cors from "cors"
import {json, Express} from "express"

export default class Middlewares {
    #app: Express 
    
    constructor(app: Express){
        this.#app = app
    }

    startMiddlewares(): void{
        this.#app.use(cors());
        this.#app.use(json());
    }
}
