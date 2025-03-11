"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizer = authorizer;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authorizer(req, res, next) {
    const JWT_SECRET = process.env.JWT_SECRET;
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Acesso negado!" });
    }
    try {
        const data = jsonwebtoken_1.default.verify(token.replace("Bearer ", ""), JWT_SECRET);
        req.userId = data.id;
        next();
    }
    catch (error) {
        return res.status(403).json({ message: "Token inválido!" });
    }
}
