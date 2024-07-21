import express, { Express } from "express";
import { updateGuest, loadGuest, addGuest} from './routes';
import bodyParser from 'body-parser';


// Configure and start the HTTP server.
const port: number = 8088;
const app: Express = express();
app.use(bodyParser.json());
app.post("/api/create", addGuest);
app.post("/api/save", updateGuest);
app.get("/api/load", loadGuest);
app.listen(port, () => console.log(`Server listening on ${port}`));
