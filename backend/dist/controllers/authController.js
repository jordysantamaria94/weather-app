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
exports.loginUser = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body === undefined) {
        return res
            .status(400)
            .json({ flag: false, error: "Request body is required" });
    }
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(400)
            .json({ message: "Email y contraseña son requeridos." });
    }
    try {
        // 1. Encontrar el usuario por email
        const user = yield prisma_1.default.user.findUnique({
            where: { email: email },
        });
        if (!user) {
            return res.status(401).json({ message: "Credenciales inválidas." });
        }
        // 2. Comparar la contraseña proporcionada con la hasheada en la BD
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Credenciales inválidas." });
        }
        // 3. Generar el Token JWT
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            console.error("JWT_SECRET is undefined.");
            return res
                .status(500)
                .json({ message: "Error de configuración del servidor." });
        }
        // Payload del token (información que quieres almacenar en el token)
        const tokenPayload = {
            userId: user.id,
            userEmail: user.email,
            // Puedes añadir roles aquí si los tuvieras: role: user.role
        };
        // Firma el token con la clave secreta
        // 'expiresIn' define la duración del token (ej. '1h', '7d', '30m')
        const token = jsonwebtoken_1.default.sign(tokenPayload, jwtSecret, { expiresIn: "1h" });
        // No devolver la contraseña del usuario en la respuesta
        const { password: _ } = user, userWithoutPassword = __rest(user, ["password"]);
        res.status(200).json({
            flag: true,
            user: userWithoutPassword,
            token: token
        });
    }
    catch (error) {
        console.error("Error durante el inicio de sesión:", error);
        res.status(500).json({
            message: "Error interno del servidor durante el inicio de sesión.",
        });
    }
});
exports.loginUser = loginUser;
