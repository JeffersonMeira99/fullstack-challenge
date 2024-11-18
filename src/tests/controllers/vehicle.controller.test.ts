jest.mock("typeorm", () => ({
  Entity: jest.fn(),
  PrimaryGeneratedColumn: jest.fn(),
  Column: jest.fn(),
  ManyToOne: jest.fn(),
  OneToMany: jest.fn(),
  JoinColumn: jest.fn(),
  Index: jest.fn(),
  getRepository: jest.fn(),
}));

import {
  createVehicle,
  getVehiclesByDriver,
} from "../../controllers/vehicle.controller";
import { vehicleService } from "../../services/vehicle.service";
import { CreateVehicleDto } from "../../dto/create-vehicle.dto";
import { Request, Response } from "express";

jest.mock("../../services/vehicle.service", () => ({
  vehicleService: {
    createVehicle: jest.fn(),
    getVehiclesByDriver: jest.fn(),
  },
}));

describe("vehicleController", () => {
  it("should create a new vehicle and return it", async () => {
    const vehicleData: CreateVehicleDto = {
      driver_id: 1,
      plate: "ABC1234",
      model: "Fusca",
      type: "Carro",
      capacity: "5",
    };

    const savedVehicle = { ...vehicleData, id: 1 };
    (vehicleService.createVehicle as jest.Mock).mockResolvedValue(savedVehicle);

    const req = {
      body: vehicleData,
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await createVehicle(req, res);

    expect(vehicleService.createVehicle).toHaveBeenCalledWith(vehicleData);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(savedVehicle);
  });

  it("should get vehicles by driver", async () => {
    const driverId = 1;
    const vehicles = [
      {
        driver_id: driverId,
        plate: "ABC1234",
        model: "Fusca",
        type: "Carro",
        capacity: "5",
        id: 1,
      },
    ];

    (vehicleService.getVehiclesByDriver as jest.Mock).mockResolvedValue(
      vehicles
    );

    const req = { params: { driverId: driverId } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getVehiclesByDriver(req, res);

    expect(vehicleService.getVehiclesByDriver).toHaveBeenCalledWith(driverId);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(vehicles);
  });
});
