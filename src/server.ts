import express from "express";
import cors from "cors";
import { routes as ClanRoutes } from "./routes/clans.routes";
import { routes as LocationRoutes } from "./routes/locations.routes";
import { routes as CardRoutes } from "./routes/cards.routes";
import { routes as PlayerRoutes } from "./routes/players.routes";
import { routes as TournamentsRoutes } from "./routes/tournaments.routes";
import { routes as Globaltournaments } from "./routes/globaltournaments.routes";

const app = express();

app.use(cors({}));

app.use(ClanRoutes);
app.use(LocationRoutes);
app.use(CardRoutes);
app.use(PlayerRoutes);
app.use(TournamentsRoutes);
app.use(Globaltournaments);

app.listen(3333);
