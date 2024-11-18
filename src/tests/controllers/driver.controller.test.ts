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

import { createDriver } from "../../controllers/driver.controller";
import { driverService } from "../../services/driver.service";
import { CreateDriverDto } from "../../dto/create-driver.dto";
import { Request, Response } from "express";

jest.mock("../../services/driver.service", () => ({
  driverService: {
    createDriver: jest.fn(),
  },
}));

describe("createDriver Controller", () => {
  it("should create a new driver and return it", async () => {
    const driverData: CreateDriverDto = {
      company_id: 1,
      first_name: "Motorista",
      last_name: "Teste",
      email: "motorista@test.com",
      phone: "123456789",
      avatar_url: "http://avatar.com/avatar.jpg",
      status: "Active",
    };

    const savedDriver = { ...driverData, id: 1 };

    (driverService.createDriver as jest.Mock).mockResolvedValue(savedDriver);

    const req = {
      body: driverData,
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await createDriver(req, res);

    expect(driverService.createDriver).toHaveBeenCalledWith(driverData);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(savedDriver);
  });

  it("should return an error if driver creation fails", async () => {
    const driverData: CreateDriverDto = {
      company_id: 1,
      first_name: "Motorista",
      last_name: "Teste",
      email: "motorista@test.com",
      phone: "123456789",
      avatar_url: "http://avatar.com/avatar.jpg",
      status: "Active",
    };

    const req = {
      body: driverData,
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await createDriver(req, res);

    expect(driverService.createDriver).toHaveBeenCalledWith(driverData);
  });
});
