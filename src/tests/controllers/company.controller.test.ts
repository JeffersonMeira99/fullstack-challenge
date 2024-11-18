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
  

import { Request, Response } from "express";
import { createCompany } from "../../controllers/company.controller";
import { CreateCompanyDto } from "../../dto/create-company.dto";
import { companyService } from "../../services/company.service";

jest.mock("../../services/company.service", () => ({
  companyService: {
    createCompany: jest.fn(),
  },
}));

describe("createCompany Controller", () => {
  it("should create a new company and return it", async () => {
    const companyData: CreateCompanyDto = {
      name: "Empresa Teste",
      city: 1,
      status: "Active",
      plan_type: "Basic",
    };

    const savedCompany = { ...companyData, id: 1 };
    (companyService.createCompany as jest.Mock).mockResolvedValue(savedCompany);

    const req = {
      body: companyData,
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await createCompany(req, res);

    expect(companyService.createCompany).toHaveBeenCalledWith(companyData);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(savedCompany);
  });

  it("should return an error if company creation fails", async () => {
    const companyData: CreateCompanyDto = {
      name: "Empresa Teste",
      city: 1,
      status: "Active",
      plan_type: "Basic",
    };

    const req = {
      body: companyData,
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await createCompany(req, res);

    expect(companyService.createCompany).toHaveBeenCalledWith(companyData);
  });
});
