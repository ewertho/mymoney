import { Router } from "express";
import { login, signup, validateToken } from "../controllers/authController";
import {
  createBillingCycle,
  deleteBillingCycle,
  getBillingCycle,
  getSummary,
  listBillingCycles,
  updateBillingCycle,
} from "../controllers/billingCycleController";
import { authMiddleware } from "../middlewares/auth";

export const routes = Router();

routes.post("/auth/signup", signup);
routes.post("/auth/login", login);
routes.post("/auth/validate-token", validateToken);

routes.use(authMiddleware);
routes.get("/billing-cycles", listBillingCycles);
routes.get("/billing-cycles/summary", getSummary);
routes.get("/billing-cycles/:id", getBillingCycle);
routes.post("/billing-cycles", createBillingCycle);
routes.put("/billing-cycles/:id", updateBillingCycle);
routes.delete("/billing-cycles/:id", deleteBillingCycle);
