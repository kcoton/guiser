/* Citation
 * 
 * Adapted from code commited to all CPSC 310 project repos by 310-bot (i.e. Reid Holmes et al.).
 * 
 * https://github.com/bshapka/insight-ubc/commit/1c0c9f621d4307a6baa5f8aa221f518896c3b9ee
 */

import express, {Application, Request, Response} from "express";
import * as http from "http";
import cors from "cors";

export default class Server {
	private readonly port: number;
	private express: Application;
	private server: http.Server | undefined;

	constructor(port: number) {
		this.port = port;
		this.express = express();
		this.registerMiddleware();
		this.registerRoutes();
	}

	public start(): Promise<void> {
		return new Promise((resolve, reject) => {
			if (this.server !== undefined) {
				reject();
			} else {
				this.server = this.express.listen(this.port, () => {
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
		this.express.use(cors());
	}

	private registerRoutes() {
		this.express.get("/echo/:msg", Server.echo);
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