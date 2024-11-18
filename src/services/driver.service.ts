import { getRepository } from "typeorm";
import { Company } from "../entity/company.entity";
import { Driver } from "../entity/driver.entity";
import { CreateDriverDto } from "../dto/create-driver.dto";
import { validateDto } from "../utils/validation.utils";

export const driverService = {
  findAll: async () => {
    const driverRepository = getRepository(Driver);
    const drivers = await driverRepository.find();
    return drivers;
  },

  getDriversByCompany: async (companyId: number) => {
    const driverRepository = getRepository(Driver);
    const drivers = await driverRepository.find({
      where: { company_id: companyId },
      relations: ["company"],
    });
    return drivers;
  },

  createDriver: async (driverData: CreateDriverDto) => {
    await validateDto(driverData);

    const driverRepository = getRepository(Driver);
    const companyRepository = getRepository(Company);

    const company = await companyRepository.findOne({
      where: { id: driverData.company_id },
    });
    if (!company) {
      throw new Error("Company not found");
    }

    const newDriver = driverRepository.create(driverData);
    await driverRepository.save(newDriver);

    return newDriver;
  },
};
