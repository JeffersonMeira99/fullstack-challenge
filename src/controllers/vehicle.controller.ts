import { Request, Response } from "express";
import { vehicleService } from "../services/vehicle.service";
import { CreateVehicleDto } from "../dto/create-vehicle.dto";
import { plainToInstance } from "class-transformer";
import { validateDto } from "../utils/validation.utils";

export const getVehiclesByDriver = async (
  req: Request,
  res: Response
): Promise<void> => {
  const driverId = parseInt(req.params.driverId);
  const vehicles = await vehicleService.getVehiclesByDriver(driverId);
  res.status(200).json(vehicles);
};

export const createVehicle = async (
  req: Request,
  res: Response
): Promise<void> => {
  const vehicleDto = plainToInstance(CreateVehicleDto, req.body);

  await validateDto(vehicleDto);

  const newVehicle = await vehicleService.createVehicle(vehicleDto);
  res.status(201).json(newVehicle);
};
