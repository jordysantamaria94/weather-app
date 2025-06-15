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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getAllUsers = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma_1.default.user.findMany();
        res.status(200).json({
            flag: true,
            users,
        });
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ flag: false, error: "Internal Server Error" });
    }
});
exports.getAllUsers = getAllUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body === undefined) {
        return res
            .status(400)
            .json({ flag: false, error: "Request body is required" });
    }
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res
            .status(400)
            .json({ flag: false, error: "Name, email, and password are required" });
    }
    try {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = yield prisma_1.default.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        const { password: _ } = newUser, userWithoutPassword = __rest(newUser, ["password"]);
        res.status(201).json(userWithoutPassword);
    }
    catch (error) {
        console.error("Error creating user:", error);
        if (error instanceof Error &&
            error.message.includes("Unique constraint failed")) {
            return res
                .status(409)
                .json({ flag: false, error: "Email already exists" });
        }
        res.status(500).json({ flag: false, error: "Internal Server Error" });
    }
});
exports.createUser = createUser;
