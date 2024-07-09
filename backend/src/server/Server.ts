/* Citation
 * 
 * Adapted from code commited to all CPSC 310 project repos by 310-bot (i.e. Reid Holmes et al.).
 * 
 * https://github.com/bshapka/insight-ubc/commit/1c0c9f621d4307a6baa5f8aa221f518896c3b9ee
 */
import express, {Application, Request, Response} from "express";
import * as https from "https";
import * as http from "http";
import cors from "cors";
import AuthRouter from "../routers/AuthRouter";
import cookieParser from "cookie-parser";
import contentRouter from "../routers/ContentRouter";
import PubRouter from "../routers/PubRouter";
import socialAppRouter from "../routers/SocialAppRouter";
import userRouter from "../routers/UserRouter";
import fs from 'fs';
import mongoose from "mongoose";

export default class Server {
    private readonly port: number;
    private readonly httpsCertPath: string;
    private readonly httpsKeyPath: string;
    private express: Application;
    private server: https.Server | http.Server | undefined;

    constructor(port: number, httpsCertPath: string = '', httpsKeyPath: string = '') {
        this.port = port;
	    this.httpsCertPath = httpsCertPath;
	    this.httpsKeyPath = httpsKeyPath;
        this.express = express();
        this.registerMiddleware();
	    this.registerRoutes();
        this.connectToDatabase();
    }

    public start(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.server !== undefined) {
                reject();
            } else if (!this.httpsCertPath || !this.httpsKeyPath) {
                this.server = this.express.listen(this.port, () => {
                    resolve();
                }).on("error", (err: Error) => {
                    reject(err);
                });
            } else {
                const certBuf: Buffer = fs.readFileSync(this.httpsCertPath);
                const keyBuf: Buffer = fs.readFileSync(this.httpsKeyPath);
                const httpsParams = {key: keyBuf, cert: certBuf};
                this.server = https.createServer(httpsParams, this.express).listen(this.port, () => {
                    resolve();
                }).on("error", (err: Error) => {
                    reject(err);
                });
            }
        });
    }

    public stop(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.server === undefined) {
                reject();
            } else {
                this.server.close(() => {
                    resolve();
                });
            }
        });
    }

    private registerMiddleware() {
        this.express.use(express.json());
        this.express.use(cookieParser());
        this.express.use(express.urlencoded( { extended: false }));
        this.express.use(cors());
    }

    private registerRoutes() {
        this.express.get("/echo/:msg", Server.echo);
        this.express.use("/auth", AuthRouter);
        this.express.use("/content", contentRouter);
	    this.express.use("/pub", PubRouter);
        this.express.use("/social-app", socialAppRouter);
        this.express.use("/user", userRouter);
    }

    private connectToDatabase() {
        const mongoDbUri: string = process.env.MONGO_DB_URI ?? '';
        mongoose.connect(mongoDbUri).catch(
            (err) => console.error('Error connecting to MongoDB', err)
        );
    }

    private static echo(req: Request, res: Response) {
        try {
            console.log(`Server::echo(..) - params: ${JSON.stringify(req.params)}`);
            const response = Server.performEcho(req.params.msg);
            res.status(200).json({result: response});
        } catch (err) {
            res.status(400).json({error: err});
        }
    }

    private static performEcho(msg: string): string {
        if (typeof msg !== "undefined" && msg !== null) {
            return `${msg}...${msg}`;
        } else {
            return "Message not provided";
        }
    }
}
