"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const api_1 = require("../services/api");
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
const routes = (0, express_1.Router)();
exports.routes = routes;
clanRoutes.map((locationRoute) => {
    routes.get(locationRoute, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const queryParams = req.query;
        const { locationId, seasonId, tournamentTag } = req.params;
        const { authorization } = req.headers;
        const [, token] = authorization.split(" ");
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
            const response = yield api_1.api.get(`${route}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
                params: Object.assign({}, queryParams),
            });
            res.json(response.data);
        }
        catch (error) {
            const { response } = error;
            res.json(response === null || response === void 0 ? void 0 : response.data);
        }
    }));
});
