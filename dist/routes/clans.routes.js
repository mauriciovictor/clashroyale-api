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
    "/clans/:clanTag/warlog",
    "/clans",
    "/clans/:clanTag/riverracelog",
    "/clans/:clanTag/currentwar",
    "/clans/:clanTag",
    "/clans/:clanTag/members",
    "/clans/:clanTag/currentriverrace",
];
const routes = (0, express_1.Router)();
exports.routes = routes;
clanRoutes.map((clanRoute) => {
    routes.get(clanRoute, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const queryParams = req.query;
        const { clanTag } = req.params;
        const { authorization } = req.headers;
        const [, token] = authorization.split(" ");
        const newClanRoute = clanTag
            ? clanRoute.replace(":clanTag", clanTag).replace("#", "%23")
            : clanRoute;
        try {
            const response = yield api_1.api.get(`${newClanRoute}`, {
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
