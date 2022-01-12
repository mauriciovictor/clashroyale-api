import { AxiosError } from "axios";
import { Router } from "express";
import { api } from "../services/api";

const clanRoutes = [
  "/locations/:locationId/rankings/clans",
  "/locations/:locationId/rankings/players",
  "/locations/:locationId/rankings/clanwars",
  "/locations/global/seasons/:seasonId",
  "/locations/global/seasons/:seasonId/rankings/players",
  "/locations/global/seasons",
  "/locations",
  "/locations/:locationId",
  "/locations/global/rankings/tournaments/:tournamentTag",
];

interface LocationsRoutesProps {
  locationId?: string;
  tournamentTag?: string;
  seasonId?: string;
}

const routes = Router();

clanRoutes.map((locationRoute) => {
  routes.get(locationRoute, async (req, res) => {
    const queryParams = req.query;
    const { locationId, seasonId, tournamentTag } =
      req.params as LocationsRoutesProps;

    const { authorization } = req.headers;

    const [, token] = authorization!.split(" ");

    const queries = [
      {
        name: "locationId",
        param: ":locationId",
        value: locationId,
      },
      {
        name: "seasonId",
        param: ":seasonId",
        value: seasonId,
      },
      {
        name: "tournamentTag",
        param: ":tournamentTag",
        value: tournamentTag,
      },
    ];

    let route = locationRoute;

    queries.map((query) => {
      if (query.value) {
        route = route.replace(query.param, query.value);
      }
    });

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
