import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser";
import compression from "express-compression";
import { initializePassport } from "../config/passport.js";
import {addLogger} from '../config/logger_Base.js';
import flash from 'connect-flash';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUIExpress from "swagger-ui-express"

import { swaggerOptions } from "../config/swaggerconfig.js";

//MIDDLEWARE SESSION
export const initialGlobalsMiddleware = (app) => {
    app.use(cors());

    //Express-Compression Brotli
    app.use(compression({
    brotli:{enabled: true,zlib: {}}
    }));

    app.use(session({
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URL,
            ttl: 1000,
        }),
        secret: 'secretCoder',
        resave: true,
        saveUninitialized: true
    }));

    //SWAGGER
    const specs = swaggerJSDoc(swaggerOptions)
    app.use("/apidocs", swaggerUIExpress.serve, swaggerUIExpress.setup(specs))

    //REQ.FLASH
    app.use(flash());

    app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
    });

    // MIDDLEWARES
    app.use(cookieParser());
    
    //Para poder user PostMan
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    //logger
    app.use(addLogger);

     //Passport
    initializePassport(); 
    app.use(passport.initialize());
    app.use(passport.session());
};