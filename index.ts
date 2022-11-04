import dotenv from "dotenv"
dotenv.config();
import express, { Express } from "express"
import Middlewares from "./middlewares";
import sequelize from "./configs/devCon";

const app: Express = express();

//setting server port
const port: string = process.env.PORT + ''

//INITIALIZE MIDLEWARES 
const middlewares: Middlewares = new Middlewares(app);
middlewares.startMiddlewares();

app.listen(port, async () => {
    console.log(`Server online on port ${port}`)
    try{
        await sequelize.sync();
        console.log("Connected to database");
    }catch(err){
        console.log(err);

    }
});
