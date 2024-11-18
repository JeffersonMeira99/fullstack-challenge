import {
  IsInt,
  IsString,
  IsOptional,
  IsNotEmpty,
  Length,
} from "class-validator";

export class CreateCompanyDto {
  @IsString({ message: "O nome da empresa deve ser uma string." })
  @Length(1, 100, {
    message: "O nome da empresa deve ter entre 1 e 100 caracteres.",
  })
  @IsNotEmpty({ message: "O nome da empresa é obrigatório." })
  name!: string;

  @IsInt({ message: "A cidade deve ser um número inteiro." })
  @IsNotEmpty({ message: "A cidade é obrigatória." })
  city!: number;

  @IsString({ message: "O status deve ser uma string." })
  @IsOptional({ message: "O status é opcional." })
  status?: string;

  @IsString({ message: "O tipo de plano deve ser uma string." })
  @IsOptional({ message: "O tipo de plano é opcional." })
  plan_type?: string;
}
