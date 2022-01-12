import { AxiosError } from "axios";
import { Router } from "express";
import { api } from "../services/api";

const tournamentsRoutes = ["/tournaments", "/tournaments/:tournamentTag"];

interface TournamentsParamProps {
  tournamentTag?: string;
}

const routes = Router();

tournamentsRoutes.map((tournamentRoutes) => {
  routes.get(tournamentRoutes, async (req, res) => {
    const queryParams = req.query;
    const { authorization } = req.headers;
    const { tournamentTag } = req.params as TournamentsParamProps;

    const [, token] = authorization!.split(" ");

    const route = tournamentRoutes.replace(":tournamentTag", tournamentTag!);

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
