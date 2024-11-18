import { Router } from "express";
import {
  getDriversByCompany,
  createDriver,
} from "../controllers/driver.controller";

const router = Router();

// Rota para listar motoristas por empresa
router.get("/company/:companyId/drivers", getDriversByCompany);

// Rota para criar um novo motorista
router.post("/drivers", createDriver);

export default router;
