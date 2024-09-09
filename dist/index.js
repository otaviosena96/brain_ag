"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const producers_routes_1 = __importDefault(require("./modules/producers/infra/producers.routes"));
const dashboard_routes_1 = __importDefault(require("./modules/dashboard/infra/dashboard.routes"));
require("./container/index");
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(producers_routes_1.default);
app.use(dashboard_routes_1.default);
app.get('/', (req, res) => {
    res.send('Olá mundo!'); // Responde com uma mensagem de boas-vindas
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
