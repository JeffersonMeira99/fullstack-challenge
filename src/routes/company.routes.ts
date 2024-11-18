import { Router } from "express";
import { createCompany } from "../controllers/company.controller";

const router = Router();

// Rota para criar uma nova empresa
router.post("/companies", createCompany);

export default router;
