import { AxiosError } from "axios";
import { Router } from "express";
import { api } from "../services/api";

const playersRoutes = [
  "/players/:playerTag",
  "/players/:playerTag/upcomingchests",
  "/players/:playerTag/battlelog",
];

interface PlayerParamProps {
  playerTag?: string;
}

const routes = Router();

playersRoutes.map((playerRoute) => {
  routes.get(playerRoute, async (req, res) => {
    const queryParams = req.query;
    const { authorization } = req.headers;
    const { playerTag } = req.params as PlayerParamProps;

    const [, token] = authorization!.split(" ");

    const route = playerRoute
      .replace(":playerTag", playerTag!)
      .replace("#", "%23");

    try {
      const response = await api.get(`${route}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
        params: { ...queryParams },
      });

      res.json(response.data);
    } catch (error: any) {
      const { response } = error as AxiosError;

      res.json(response?.data);
    }
  });
});

export { routes };
