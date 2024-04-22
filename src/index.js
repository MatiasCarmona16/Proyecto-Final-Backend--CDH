import express from 'express';
import path from 'path';
import handlebars from "express-handlebars";
import dotenv from "dotenv";

import { __dirname } from './path.js';

import { MongoSingleton } from './config/connectionDB.js';
import { initialGlobalsMiddleware } from './middlewares/config.middleware.js'; 
import { setRoutApi, setRoutViews } from './routes/index.js';
import { requireLogin } from './middlewares/auth.js';


dotenv.config({ path: ".env.dev",});

//Express
const app = express();
//Port Designada
const PORT = process.env.PORT;

initialGlobalsMiddleware(app);

//Carpeta Public
app.use("/", express.static(path.join(__dirname, "/public")));

//MOTOR DE PLANTILLA
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname+'/views');

setRoutApi(app, requireLogin);
setRoutViews(app, requireLogin);

//APP LISTEN
app.listen (PORT, () => {
    console.log(`Server ${PORT} ON`)
    MongoSingleton.getInstance();
})





