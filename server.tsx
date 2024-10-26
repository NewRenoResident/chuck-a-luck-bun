import express from "express";
import path from "path";
import { renderToString } from "react-dom/server";

export const runServer = () => {
  const app = express();
  const port = 3000;

  const publicPath = path.join(__dirname, "public");
  const gamePath = path.join(__dirname, "game");

  console.log("Public directory path:", publicPath);
  console.log("Game directory path:", gamePath);

  app.use(express.static(publicPath));

  app.use(
    "/game",
    express.static(gamePath, {
      setHeaders: (res) => {
        res.set("Content-Type", "text/javascript");
      },
    })
  );

  app.get("/", (req, res) => {
    const html = renderToString(
      <html>
        <head>
          <script type="module" src="./chuck-a-luck.js"></script>
        </head>
        <body></body>
      </html>
    );

    res.send(`<!DOCTYPE html>${html}`);
  });

  app.get("/chuck-a-luck.js", (req, res) => {
    const filePath = path.join(__dirname, "./src/game/chuck-a-luck.js");
    console.log("Attempting to serve:", filePath);
    res.sendFile(filePath, (err) => {
      if (err) {
        console.log("Error serving file:");
      } else {
        console.log("File served successfully");
      }
    });
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

runServer();
