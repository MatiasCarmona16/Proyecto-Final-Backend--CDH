import dotenv from "dotenv";
import { Command } from 'commander';


const program = new Command();

program
        .option('-p <port>', 'Puerto del servidor', 8080)
        .option('--mode <mode>', 'Modo de trabajo', 'develop') //production o develop
    program.parse();

console.log('Mode option:', program.opts().mode);

const environment = program.opts().mode;

// dotenv.config({ path: ".env.dev",});
dotenv.config({ path: environment === "production" ? ".env.prod" : ".env.dev"})

export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    adminEmail: process.env.EMAIL_ADMIN,
    adminPassword: process.env.PASSWRD_ADMIN,
    environment: environment
}