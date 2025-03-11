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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRepository_1 = require("../repositories/userRepository");
class UserService {
    constructor() {
        this.userRepository = new userRepository_1.UserRepository();
    }
    register(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userData.password) {
                throw new Error("Senha é obrigatória");
            }
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashPassword = yield bcrypt_1.default.hash(userData.password, salt);
            return this.userRepository.register(Object.assign(Object.assign({}, userData), { password: hashPassword }));
        });
    }
    login(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = userData;
            const user = yield this.userRepository.findUserByEmail(email);
            if (!user) {
                throw new Error("Usuário não encontrado");
            }
            const isMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!isMatch) {
                throw new Error("Senha incorreta");
            }
            const JWT_SECRET = process.env.JWT_SECRET || "chave-padrao-segura";
            const token = jsonwebtoken_1.default.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
            return token;
        });
    }
    findAll(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page = 1, limit = 10 } = options;
            const skip = (page - 1) * limit;
            const users = yield this.userRepository.findAllUsers(skip, limit);
            const total = yield this.userRepository.countUsers();
            return { users, total };
        });
    }
    findById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findUserById(userId);
            if (!userId) {
                throw new Error("Usuário não encontrado");
            }
            return user;
        });
    }
    update(userId, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (userData.password) {
                const salt = yield bcrypt_1.default.genSalt(10);
                userData.password = yield bcrypt_1.default.hash(userData.password, salt);
            }
            const updatedUser = yield this.userRepository.updateUser(userId, userData);
            if (!updatedUser) {
                throw new Error("Usuário não encontrado ou erro ao atualizar");
            }
            return updatedUser;
        });
    }
    delete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedUser = yield this.userRepository.deleteUser(userId);
        });
    }
}
exports.UserService = UserService;
