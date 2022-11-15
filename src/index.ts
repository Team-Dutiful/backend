import express, { Express, Request, Response, NextFunction } from "express";

import cors from "cors";
import { sequelize } from "@db/models";
import router from "@routes/index";
import { config } from "config";

const HOST: string = config.server.host || "localhost";
const PORT: number = config.server.port;
const DATEBASE: string = config.db.name;

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Request Occur! ${req.method}, ${req.url}`);
  next();
});
app.use("/", router);

app.listen(PORT, HOST, async () => {
  console.log(`[server]: Server is running at ${HOST}:${PORT}`);

  await sequelize
    .authenticate()
    .then(async () => {
      console.log(`connection success ${DATEBASE}`);
    })
    .catch((e) => {
      console.log("error: ", e);
    });
});

export {};
