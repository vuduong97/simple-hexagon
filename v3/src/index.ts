import express from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import "reflect-metadata";
import { container } from "./di/inversify.config";
import "./modules/post/infrastructure/controller/index";

const port = process.env.PORT || 3000;

// start the server
let server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(express.json());
});

let app = server.build();
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
