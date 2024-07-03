import express from 'express';
import path from 'path';
import handlebars from "express-handlebars";
import configvarenv from './config/configvarenv.js';
import http from 'http';

import { __dirname } from './path.js';
import  MongoSingleton from './dao/mongodb/connectionDB.js';
import { initialGlobalsMiddleware } from './middlewares/config.middleware.js'; 
import { setRoutApi, setRoutViews } from './routes/index.js';
import { requireLogin } from './middlewares/auth.js';
import { passAdmin } from './middlewares/passAdm.js';
import { passPrem } from './middlewares/passPrem.js';
import errorHandler from './middlewares/error.js'

import { addLogger } from './config/logger_Base.js';
import { setupSocket } from './config/socketio.js';

//Express
const app = express();

//Server http
const server = http.createServer(app);

//Confi Socket.io
setupSocket(server)

//Iniciar middlewares globals
initialGlobalsMiddleware(app);

//Carpeta Public
app.use("/", express.static(path.join(__dirname, "/public")));

//Motor de plantilla
app.engine('handlebars', handlebars.engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}));
app.set('view engine', 'handlebars');
app.set('views', __dirname+'/views');

//Logger
app.use(addLogger);

app.use(errorHandler);

//Routes
setRoutApi(app, requireLogin, passPrem);
setRoutViews(app, requireLogin, passAdmin, passPrem);

//App listen
const SERVER_PORT = configvarenv.port;

server.listen (SERVER_PORT, () => {
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







