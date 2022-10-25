import express, { Express, Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { sequelize } from "./db/models";
import router from './routes/index';

dotenv.config();

const PORT: number = parseInt(process.env.DB_PORT as string, 10) || 5000;
const HOST: string = process.env.DB_HOST || "localhost";
const DATEBASE: string = process.env.DB_DBNAME;

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Request Occur! ${req.method}, ${req.url}`);
  next();
});
app.use('/', router)

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

export {}