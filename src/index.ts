import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = 8080;

app.get("/", (req: Request, res: Response) => {
  res.send("Dutiful");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at port-${port}`);
});
