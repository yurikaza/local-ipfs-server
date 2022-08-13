import express, { Express } from "express";
import dotenv from "dotenv";
import { ConnectDatabase } from "./db/mongooseConnect";
import localRouter from "./routers/db.routes";
import bodyParser from "body-parser";
import cors from "cors";
import { fromLink } from "./databaseManagement/fromLink";

class server {
  public render() {
    dotenv.config();

    const app: Express = express();
    const port = process.env.PORT;

    app.use(cors());
    app.use(bodyParser.json());

    app.use("/", localRouter);
    fromLink();

    app.listen(port, () => {
      console.log(
        `⚡️[server]: Server is running at https://localhost:${port}`
      );
    });
  }
}

const myServer: any = new server();
const database: any = new ConnectDatabase();

database.render();
myServer.render();
