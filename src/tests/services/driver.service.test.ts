jest.mock("typeorm", () => ({
  PrimaryGeneratedColumn: jest.fn(),
  Entity: jest.fn(),
  Column: jest.fn(),
  ManyToOne: jest.fn(),
  OneToMany: jest.fn(),
  JoinColumn: jest.fn(),
  Index: jest.fn(),
  getRepository: jest.fn(),
}));

import { driverService } from "../../services/driver.service";
import { CreateDriverDto } from "../../dto/create-driver.dto";
import { getRepository } from "typeorm";
import { validateDto } from "../../utils/validation.utils";

// Mockando o TypeORM
jest.mock("typeorm", () => ({
  getRepository: jest.fn(),
}));

// Mockando a função de validação
jest.mock("../../utils/validation.utils", () => ({
  validateDto: jest.fn(),
}));

describe("driverService", () => {
  let mockDriverRepository: any;
  let mockCompanyRepository: any;

  beforeEach(() => {
    mockDriverRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
    };

    mockCompanyRepository = {
      findOne: jest.fn(),
    };

    (getRepository as jest.Mock).mockReturnValueOnce(mockDriverRepository); // Mock do repositório de Driver
    (getRepository as jest.Mock).mockReturnValueOnce(mockCompanyRepository); // Mock do repositório de Company
  });

  it("should create a new driver", async () => {
    const driverData: CreateDriverDto = {
      company_id: 1,
      first_name: "Motorista",
      last_name: "Teste",
      email: "motorista@test.com",
      phone: "123456789",
      avatar_url: "http://avatar.com/avatar.jpg",
      status: "Active",
    };

    const company = { id: 1, name: "Empresa Teste" }; // Mock da empresa existente
    const savedDriver = { ...driverData, id: 1 };

    // Mockando a função de validação
    (validateDto as jest.Mock).mockResolvedValue(true);
    mockCompanyRepository.findOne.mockResolvedValue(company);
    mockDriverRepository.create.mockReturnValue(savedDriver);
    mockDriverRepository.save.mockResolvedValue(savedDriver);

    const result = await driverService.createDriver(driverData);

    expect(validateDto).toHaveBeenCalledWith(driverData);
    expect(mockCompanyRepository.findOne).toHaveBeenCalledWith({
      where: { id: driverData.company_id },
    });
    expect(mockDriverRepository.create).toHaveBeenCalledWith(driverData);
    expect(mockDriverRepository.save).toHaveBeenCalledWith(savedDriver);
    expect(result).toEqual(savedDriver);
  });

  it("should throw an error if company not found", async () => {
    const driverData: CreateDriverDto = {
      company_id: 1,
      first_name: "Motorista",
      last_name: "Teste",
      email: "motorista@test.com",
      phone: "123456789",
      avatar_url: "http://avatar.com/avatar.jpg",
      status: "Active",
    };

    // Mockando a função de validação
    (validateDto as jest.Mock).mockResolvedValue(true);
    mockCompanyRepository.findOne.mockResolvedValue(null); // Empresa não encontrada

    await expect(driverService.createDriver(driverData)).rejects.toThrow(
      "Company not found"
    );
  });
});
