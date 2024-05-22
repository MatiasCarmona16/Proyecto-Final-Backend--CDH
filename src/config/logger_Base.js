import winston from "winston";
import configvarenv from "./configvarenv.js";

//Customizacion de loggers
const customLevelOpts = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        http: 3,
        info: 4,
        debug: 5,
    },

    colors: {
        fatal: 'red',
        error: 'yellow',
        warning: 'magenta',
        http: 'green',
        info: 'blue',
        debug: 'grey',
    }
};

winston.addColors(customLevelOpts.colors);


const developmentLogger = winston.createLogger({
    levels: customLevelOpts.levels,
    
    transports: [
        new winston.transports.Console(
            {
                level: 'debug',
                format: winston.format.combine(
                    winston.format.colorize({colors: customLevelOpts.colors}),
                    winston.format.simple()
                )
            }
        ),
    ]
})

const productionLogger = winston.createLogger({
    levels: customLevelOpts.levels,
    
    transports: [
        new winston.transports.Console(
            {
                level: 'info',
                format: winston.format.combine(
                    winston.format.colorize({colors: customLevelOpts.colors}),
                    winston.format.simple()
                )
            }
        ),
        new winston.transports.File(
            {
                filename: './error.log',
                level: 'error',
                format: winston.format.simple()
            }
        )
    ]
})

//Creacion del middleware

export const addLogger = (req, res, next) => {
    if(configvarenv.environment === "production"){
        req.logger = productionLogger

        req.logger.http(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`);
        req.logger.warning(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`);
        req.logger.debug(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`);
        req.logger.error(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`);
    }else{
        req.logger = developmentLogger

        req.logger.http(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`);
        req.logger.warning(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`);
        req.logger.debug(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`);
    }
    next();
}