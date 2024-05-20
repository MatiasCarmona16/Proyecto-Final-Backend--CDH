import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser";
import compression from "express-compression";
import { initializePassport } from "../config/passport.js";

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

    // MIDDLEWARES
    app.use(cookieParser());
    
    //Para poder user PostMan
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

     //Passport
    initializePassport(); 
    app.use(passport.initialize());
    app.use(passport.session());
};