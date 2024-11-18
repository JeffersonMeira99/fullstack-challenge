import { Request, Response } from "express";
import { companyService } from "../services/company.service";
import { CreateCompanyDto } from "../dto/create-company.dto";
import { plainToInstance } from "class-transformer";

export const createCompany = async (
  req: Request,
  res: Response
): Promise<void> => {
  const createCompanyDto = plainToInstance(CreateCompanyDto, req.body);

  const newCompany = await companyService.createCompany(createCompanyDto);

  res.status(201).json(newCompany);
};
