import { Request, Response } from "express";
import { driverService } from "../services/driver.service";
import { CreateDriverDto } from "../dto/create-driver.dto";
import { plainToInstance } from "class-transformer";

export const getDriversByCompany = async (
  req: Request,
  res: Response
): Promise<void> => {
  const companyId = parseInt(req.params.companyId);
  const drivers = await driverService.getDriversByCompany(companyId);
  res.status(200).json(drivers);
};

export const findAll = async (req: Request, res: Response): Promise<void> => {
  const drivers = await driverService.findAll();
  res.status(200).json(drivers);
};

export const createDriver = async (
  req: Request,
  res: Response
): Promise<void> => {
  const createDriverDto = plainToInstance(CreateDriverDto, req.body);

  const newDriver = await driverService.createDriver(createDriverDto);

  res.status(201).json(newDriver);
};
