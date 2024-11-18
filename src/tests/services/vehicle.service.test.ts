jest.mock("typeorm", () => ({
  Entity: jest.fn(),
  PrimaryGeneratedColumn: jest.fn().mockResolvedValue(1),
  Column: jest.fn(),
  ManyToOne: jest.fn(),
  OneToMany: jest.fn(),
  JoinColumn: jest.fn(),
  Index: jest.fn(),
  getRepository: jest.fn(),
}));
import { vehicleService } from "../../services/vehicle.service";
import { CreateVehicleDto } from "../../dto/create-vehicle.dto";
import { getRepository } from "typeorm";

jest.mock("typeorm", () => ({
  getRepository: jest.fn(),
}));

describe("vehicleService", () => {
  let mockVehicleRepository: any;

  beforeEach(() => {
    mockVehicleRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
    };
    (getRepository as jest.Mock).mockReturnValue(mockVehicleRepository);
  });

  it("should create a new vehicle", async () => {
    const vehicleData: CreateVehicleDto = {
      driver_id: 1,
      plate: "ABC1234",
      model: "Fusca",
      type: "Carro",
      capacity: "5",
    };
    const savedVehicle = { ...vehicleData, id: 1 };
    mockVehicleRepository.create.mockReturnValue(savedVehicle);
    mockVehicleRepository.save.mockResolvedValue(savedVehicle);

    const result = await vehicleService.createVehicle(vehicleData);

    expect(mockVehicleRepository.create).toHaveBeenCalledWith(vehicleData);
    expect(mockVehicleRepository.save).toHaveBeenCalledWith(savedVehicle);
    expect(result).toEqual(savedVehicle);
  });

  it("should get vehicles by driver", async () => {
    const driverId = 1;
    const vehicleList = [
      {
        driver_id: driverId,
        plate: "ABC1234",
        model: "Fusca",
        type: "Carro",
        capacity: "5",
        id: 1,
      },
    ];

    mockVehicleRepository.find.mockResolvedValue(vehicleList);

    const result = await vehicleService.getVehiclesByDriver(driverId);

    expect(mockVehicleRepository.find).toHaveBeenCalledWith({
      where: { driver_id: driverId },
      relations: ["driver"],
    });
    expect(result).toEqual(vehicleList);
  });
});
