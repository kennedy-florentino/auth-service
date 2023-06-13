import express from "express";
import { AppDataSource } from "./data-source";
import { errorMiddleware } from "./middlewares/error";
import routes from "./routes";

export const initializeServer = () => {
  const app = express();
  app.use(express.json());
  app.use(routes);
  app.use(errorMiddleware);
  app.listen(process.env.PORT, () =>
    console.log(`App listening on port ${process.env.PORT}!`)
  );
  return app;
};

AppDataSource.initialize().then(() => {
  console.log("Data source initialized successfully!");
  initializeServer();
});
