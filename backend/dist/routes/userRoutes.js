"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.get("/users/all", userController_1.getAllUsers);
router.post("/users/create", userController_1.createUser);
exports.default = router;
