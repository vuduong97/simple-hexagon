import express from "express";
import { Container } from "inversify";
import { buildProviderModule } from "inversify-binding-decorators";
import { InversifyExpressServer } from "inversify-express-utils";
import "reflect-metadata";

// load bindings
import "./ioc/loader";

const port = process.env.PORT || 3000;

let container = new Container();
container.load(buildProviderModule());
// start the server
let server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(express.json());
});

let app = server.build();
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
