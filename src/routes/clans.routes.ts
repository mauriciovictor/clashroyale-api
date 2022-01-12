import { AxiosError } from "axios";
import { Router } from "express";
import { api } from "../services/api";

const clanRoutes = [
  "/clans/:clanTag/warlog",
  "/clans",
  "/clans/:clanTag/riverracelog",
  "/clans/:clanTag/currentwar",
  "/clans/:clanTag",
  "/clans/:clanTag/members",
  "/clans/:clanTag/currentriverrace",
];

interface ClanRoutesProps {
  clanTag?: string;
}

const routes = Router();

clanRoutes.map((clanRoute) => {
  routes.get(clanRoute, async (req, res) => {
    const queryParams = req.query;
    const { clanTag } = req.params as ClanRoutesProps;

    const { authorization } = req.headers;

    const [, token] = authorization!.split(" ");

    const newClanRoute = clanTag
      ? clanRoute.replace(":clanTag", clanTag).replace("#", "%23")
      : clanRoute;

    try {
      const response = await api.get(`${newClanRoute}`, {
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
