import * as express from "express";
import { Express } from "express";
import * as cocktailController from "../controllers/cocktailcontroller";
import { getRandomTrack } from "../controllers/music_controller";

export function initialiseRoutes(app: Express) {
  console.log("🏗️  Setting up routers...");

  addHealthCheck(app);

  addAPIRoutes(app);
}

function addHealthCheck(app: Express) {
  console.log("🛠️  Creating base router...");

  const baseRouter = express.Router();

  baseRouter.use((req, res, next) => {
    res.header("Access-Control-Allow-Methods", "GET");
    console.log(`📨 ${req.url}`);
    next();
  });

  console.log("🏠❤️‍🩹  Adding health check route...");
  baseRouter.get("/health", (req, res) => {
    res.status(200).send("👍 Okay! The server is responding! 🙌");
  });

  console.log("🛠️  Applying base router to Express server...");
  app.use("/", baseRouter);
}

// this function adds all the routes we can access by going to /api/[someRoute]
function addAPIRoutes(app: Express) {
  console.log("🛠️  Creating API router...");

  const apiRouter = express.Router();
  apiRouter.use((req, res, next) => {
    // we'll use this router to return specifically JSON
    res.setHeader("Content-Type", "application/json");
    next();
  });

  apiRouter.get("/cocktailById/:id", cocktailController.getCocktailByIdData);

  apiRouter.get("/randomCocktail/", cocktailController.getRandomCocktailData);
  apiRouter.get(
    "/randomCocktailSong/",
    cocktailController.getRandomCocktailSongData
  );

  apiRouter.get("/genre", getRandomTrack);

  apiRouter.get(
    "/cocktailsByCategory/:category",
    cocktailController.getCocktailsByCategory
  );

  console.log("🛠️  Applying API router to Express server...");
  app.use("/api", apiRouter);
}
