import cors from "cors"
import {json, Express} from "express"
import helmet from "helmet"

export default class Middlewares {
    #app: Express 
    
    constructor(app: Express){
        this.#app = app
    }

    startMiddlewares(): void{
        this.#app.use(helmet());
        this.#app.use(json());
        this.#app.use(cors());
    }
}
