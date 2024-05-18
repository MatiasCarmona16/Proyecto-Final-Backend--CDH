import express from 'express';
import path from 'path';
import handlebars from "express-handlebars";
import dotenv from "dotenv";

import { __dirname } from './path.js';

import { MongoSingleton } from './config/connectionDB.js';
import { initialGlobalsMiddleware } from './middlewares/config.middleware.js'; 
import { setRoutApi, setRoutViews } from './routes/index.js';
import { requireLogin } from './middlewares/auth.js';
import { passAdmin} from './middlewares/admin.js';

import nodemailer from 'nodemailer';
import errorHandler from './middlewares/error.js'

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

app.use(errorHandler);

//Routes
setRoutApi(app, requireLogin, passAdmin);
setRoutViews(app, requireLogin);


const transporter = nodemailer.createTransport({
    service: "gmail", //mail
    port: 587, 
    auth: {
        user: "matias2002carmona@gmail.com",
        pass: "rkegkuxgiqczfygv", //pass Gmail
    },
});

app.use('/mail', async(req, res) => {
    let result = await transporter.sendMail({
        from: 'matias2002carmona@gmail.com',
        to: 'mati2002carmona@gmail.com, cathy2015mansilla@gmail.com, urielroodriguez26@gmail.com',
        subject: 'Soy un correo perdido :(',
        text: 'hola',
        html: 
        `
        <div>
            <h1>Estoy probando Nodemailer!</h1>
            <h2>( ͡° ͜ʖ ͡°)</h2>
            <img src="https://pbs.twimg.com/media/GHNofP-XAAAhvlD?format=jpg&name=small" />
        </div>
        `,
    })

    if(!!result.messageId){
        console.log('mensaje enviado', result.messageId);
        res.send('Mensaje enviado');
    }
})

//APP LISTEN
app.listen (PORT, () => {
    console.log(`Server ${PORT} ON`)
    MongoSingleton.getInstance();
})





