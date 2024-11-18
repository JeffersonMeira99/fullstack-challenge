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

import { companyService } from "../../services/company.service";
import { CreateCompanyDto } from "../../dto/create-company.dto";
import { getRepository } from "typeorm";

describe("companyService", () => {
  let mockCompanyRepository: any;

  beforeEach(() => {
    mockCompanyRepository = {
      create: jest.fn(),
      save: jest.fn(),
    };
    (getRepository as jest.Mock).mockReturnValue(mockCompanyRepository);
  });

  it("should create a new company", async () => {
    const companyData: CreateCompanyDto = {
      name: "Empresa Teste",
      city: 1,
      status: "Active",
      plan_type: "Basic",
    };

    const savedCompany = { ...companyData, id: 1 };
    mockCompanyRepository.create.mockReturnValue(savedCompany);
    mockCompanyRepository.save.mockResolvedValue(savedCompany);

    const result = await companyService.createCompany(companyData);

    expect(mockCompanyRepository.create).toHaveBeenCalledWith(companyData);
    expect(mockCompanyRepository.save).toHaveBeenCalledWith(savedCompany);
    expect(result).toEqual(savedCompany);
  });
});
