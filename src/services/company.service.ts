import { getRepository } from "typeorm";
import { Company } from "../entity/company.entity";
import { CreateCompanyDto } from "../dto/create-company.dto";
import { validateDto } from "../utils/validation.utils";

export const companyService = {
  createCompany: async (companyData: CreateCompanyDto) => {
    await validateDto(companyData);

    const companyRepository = getRepository(Company);

    const newCompany = companyRepository.create(companyData);
    await companyRepository.save(newCompany);

    return newCompany;
  },
};
