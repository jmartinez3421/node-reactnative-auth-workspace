import express, {Express} from 'express';
import cors from 'cors';
import { dbConnection } from "@/db/config";
import { userRouter } from "@/routes/user";
import { authRouter } from "@/routes/auth";

export class Server {
    private app: Express;

    private port = process.env.PORT;
    private paths = {
        user: '/api/user',
        auth: '/api/auth',
    }

    /**
     * Initialize all the properties of the server
     */
    constructor() {
        this.app = express();

        //Connect with the DB
        this.database();

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }

    /**
     * Connect with the database
     */
    async database(){
        await dbConnection();
    }

    /**
     * Define the middlewares of the application
     */
    middlewares() {
        //CORS
        this.app.use(cors());

        //Process body information
        this.app.use(express.json());

        //Static page
        this.app.use(express.static('public'));
    }

    /**
     * Define the routes of the application
     */
    routes() {
        //User routes
        this.app.use(this.paths.user, userRouter);
        this.app.use(this.paths.auth, authRouter);
    }

    /**
     * Starts the server on the port specified in the environment variables
     */
    start() {
        this.app.listen(this.port, () => {
            console.log('Server listening port ', this.port);
        });
    }
}
