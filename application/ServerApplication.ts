import * as express from "express";
import * as bodyParser from "body-parser";
import * as jwt from "jsonwebtoken";

import {User} from "./common/model/User";
import {config} from "./server/Security";
import {services} from "./services/index";


const application = express();

/// use json body parser
application.use(bodyParser.json());
application.use(express.static(__dirname + "/../public"));

/// run the application
application.post("/remote/:service/:method", async (request, response) => {

  const serviceName = request.params["service"];
  const methodName = request.params["method"];

  response.header("Content-Type", "application/json");

  // verify token
  const authorization = request.headers["authorization"];
  let user: User = null;

  if (authorization) {

    try {
      const token = authorization.substr("Bearer ".length);
      const decoded = jwt.decode(token, config.secretCode);

      user = decoded["_doc"] as User;
    } catch (error) {
      console.log("Invalid access token");
    }
  }


  try {

    const service = services[serviceName] as Function;

    const parameters = request.body || [];

    // create the instance
    const instance = new (
      Function.prototype.bind.apply(service, [null])
    );

    const method = instance[methodName] as Function;

    instance.user = user;
    instance.request = request;
    instance.response = response;

    const result = await method.apply(instance, parameters);

    response.send(JSON.stringify(result));

  } catch (exception) {
    response.status(500).send(JSON.stringify({
      exception
    }));
  }
});

/// listen
application.listen(process.env["PORT"] || 3000, () => {
  console.log("Server Started !");
});

