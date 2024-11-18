import { Router } from "express";
import { findAll } from "../controllers/driver.controller";
import {
  createVehicle,
  getVehiclesByDriver,
} from "../controllers/vehicle.controller";

const router = Router();

router.get("/vehicles/driver", findAll);

router.get("/vehicles/driver/:driverId", getVehiclesByDriver);

router.post("/vehicles", createVehicle);

export default router;
