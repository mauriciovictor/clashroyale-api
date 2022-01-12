import { AxiosError } from "axios";
import { Router } from "express";
import { api } from "../services/api";

const cardsRoutes = ["/cards"];

const routes = Router();

cardsRoutes.map((cardRoute) => {
  routes.get(cardRoute, async (req, res) => {
    const queryParams = req.query;
    const { authorization } = req.headers;

    const [, token] = authorization!.split(" ");

    try {
      const response = await api.get(`${cardRoute}`, {
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
