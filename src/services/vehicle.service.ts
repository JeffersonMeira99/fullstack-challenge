import { Vehicle } from "../entity/vehicle.entity";
import { initializeDatabase } from "../config/db";
import { getRepository } from "typeorm";
import { CreateVehicleDto } from "../dto/create-vehicle.dto";

class VehicleService {
  private vehicleRepository: any;

  constructor() {
    this.initializeRepository();
  }

  private async initializeRepository() {
    try {
      await initializeDatabase();
      this.vehicleRepository = getRepository(Vehicle);
    } catch (error) {
      console.error("Error initializing repository:", error);
      throw error;
    }
  }

  async getVehiclesByDriver(driverId: number): Promise<Vehicle[]> {
    if (!this.vehicleRepository) {
      throw new Error("Vehicle repository is not initialized.");
    }

    const vehicles = await this.vehicleRepository.find({
      where: { driver_id: driverId },
      relations: ["driver"],
    });
    return vehicles;
  }

  async createVehicle(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    if (!this.vehicleRepository) {
      throw new Error("Vehicle repository is not initialized.");
    }

    const vehicleData = this.vehicleRepository.create(createVehicleDto);
    await this.vehicleRepository.save(vehicleData);
    return vehicleData;
  }
}

export const vehicleService = new VehicleService();
