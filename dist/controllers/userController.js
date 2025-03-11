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
exports.UserController = void 0;
class UserController {
    constructor(userService) {
        this.userService = userService;
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.findAllUsers = this.findAllUsers.bind(this);
        this.findUserById = this.findUserById.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.body;
                const newUser = yield this.userService.register(userData);
                res.status(201).json(newUser);
            }
            catch (error) {
                next(error);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const token = yield this.userService.login({ email, password });
                res.status(200).json({ token });
            }
            catch (error) {
                next(error);
            }
        });
    }
    findAllUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page = 1, limit = 10 } = req.query;
                const { users, total } = yield this.userService.findAll({
                    page: Number(page),
                    limit: Number(limit),
                });
                res.status(200).json({ users, total });
            }
            catch (error) {
                next(error);
            }
        });
    }
    findUserById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield this.userService.findById(id);
                res.status(200).json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { name, email, password } = req.body;
                const updatedUser = yield this.userService.update(id, {
                    name,
                    email,
                    password,
                });
                res.status(200).json(updatedUser);
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield this.userService.delete(id);
                res.status(200).json({ message: "Deletado com sucesso!" });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UserController = UserController;
