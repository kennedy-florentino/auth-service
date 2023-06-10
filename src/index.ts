import { AppDataSource } from "./data-source";
import express from "express";
import routes from "./routes";
import { errorMiddleware } from "./middlewares/error";

AppDataSource.initialize().then(() => {
  console.log("Data source initialized successfully!");
  const app = express();
  app.use(express.json());
  app.use(routes);
  app.use(errorMiddleware);
  app.listen(process.env.PORT);
  console.log(`App listening on port ${process.env.PORT}!`);
  return app;
});
