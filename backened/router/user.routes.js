import { Router } from "express";

import {
  changePassword,
  forgotPassword,
  getProfile,
  login,
  logout,
  register,
  resetPassword,
  update,
} from "../controller/user.controller.js";
import { isLoggedIn } from "../middlewares/auth.middlewares.js";
import upload from "../middlewares/multer.middleware.js";

const userRoutes = Router();

userRoutes.post("/register", upload.single("avatar"), register);
userRoutes.post("/login", login);
userRoutes.get("/logout", logout);
userRoutes.get("/me", isLoggedIn, getProfile);
userRoutes.post("/forgot-password", forgotPassword);
userRoutes.post("/reset/:resetToken", resetPassword);
userRoutes.post("/change-password", isLoggedIn, changePassword);
userRoutes.put("/update/:id", isLoggedIn, upload.single("avatar"), update);

export default userRoutes;
