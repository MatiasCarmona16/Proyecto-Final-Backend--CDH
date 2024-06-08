import express from 'express';
import path from 'path';
import handlebars from "express-handlebars";
import configvarenv from './config/configvarenv.js';

import { __dirname } from './path.js';
import  MongoSingleton from './config/connectionDB.js';
import { initialGlobalsMiddleware } from './middlewares/config.middleware.js'; 
import { setRoutApi, setRoutViews } from './routes/index.js';
import { requireLogin } from './middlewares/auth.js';
import { passAdmin} from './middlewares/admin.js';
import errorHandler from './middlewares/error.js'

import { addLogger } from './config/logger_Base.js';

//Express
const app = express();

initialGlobalsMiddleware(app);

//Carpeta Public
app.use("/", express.static(path.join(__dirname, "/public")));

//MOTOR DE PLANTILLA
app.engine('handlebars', handlebars.engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}));
app.set('view engine', 'handlebars');
app.set('views', __dirname+'/views');

app.use(addLogger);

app.use(errorHandler);

//Routes
setRoutApi(app, requireLogin, passAdmin);
setRoutViews(app, requireLogin, passAdmin);

//APP LISTEN
const SERVER_PORT = configvarenv.port;

app.listen (SERVER_PORT, () => {
    console.log(`Server escuchando en el PORT: ${SERVER_PORT}`)
})

//MONGOSINGELTON
const mongoInstance = async () => {
    try {
        await MongoSingleton.getInstance()
    } catch(error) {
        console.error(error)
    }
};
mongoInstance();







