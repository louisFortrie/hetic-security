import Express, { json } from "express";
import { createServer, Server } from "http";
import { hostname, platform, type } from "os";
import swaggerUi from "swagger-ui-express";
import { DefaultErrorHandler } from "./middleware/error-handler.middleware";
import { RegisterRoutes } from "./routes/routes";
import { Log } from "./utility/Logging/Log";
import { requestLogMiddleware } from "./utility/Logging/log.middleware";

export const StartServer = async () => {
  const PORT = process.env.PORT || 5055;

  const app = Express();

  app.use(json());

  app.use(requestLogMiddleware("req"));

  RegisterRoutes(app);

  app.use(Express.static("public"));
  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
      swaggerOptions: {
        url: "/swagger.json",
      },
    })
  );

  app.use(DefaultErrorHandler);

  app.get("/info", (req: any, res: any) => {
    res.json({
      title: "Security Code Samples API",
      familyName: "FORTRIE",
      apanyan: "APANYAN",
      host: hostname(),
      platform: platform(),
      type: type(),
    });
  });

  return new Promise<Server>((resolve) => {
    const server = createServer(app);
    server.listen(PORT, () => {
      Log(`API Listening on port ${PORT}`);
      resolve(server);
    });
  });
};

export const StopServer = async (server: Server | undefined) => {
  if (!server) {
    return;
  }
  return new Promise<void>((resolve, reject) => {
    server.close((err: any) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
