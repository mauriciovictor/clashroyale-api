import { AxiosError } from "axios";
import { Router } from "express";
import { api } from "../services/api";

const globaltournamentsRoutes = ["/globaltournaments"];

const routes = Router();

globaltournamentsRoutes.map((globaltournamentsRoute) => {
  routes.get(globaltournamentsRoute, async (req, res) => {
    const queryParams = req.query;
    const { authorization } = req.headers;

    const [, token] = authorization!.split(" ");

    try {
      const response = await api.get(`${globaltournamentsRoute}`, {
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
