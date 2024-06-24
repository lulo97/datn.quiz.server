import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { createServer } from "http";
import { RouteObjects } from "./Routes";
import { setupSocketIO } from "./RoomSocket/RoomSocket";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
    cors({
        origin: "*", // Wildcard is NOT for Production
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    })
);
app.use(bodyParser.json());
//To access static file directly
app.use("/public", express.static(path.join(process.cwd(), "public")));

app.get("/", (req, res) => res.send("Hello world!"));

RouteObjects.forEach(({ path, router }) => {
    app.use(path, router);
});

//Start-Socket
const httpServer = createServer(app);

setupSocketIO(httpServer);

httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
