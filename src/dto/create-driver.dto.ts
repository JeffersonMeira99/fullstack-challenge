import {
    IsInt,
    IsString,
    IsEmail,
    IsOptional,
    IsNotEmpty,
    Length,
  } from "class-validator";
  
  export class CreateDriverDto {
    @IsInt({ message: "O ID da empresa deve ser um número inteiro." })
    @IsNotEmpty({ message: "O ID da empresa é obrigatório." })
    company_id!: number;
  
    @IsString({ message: "O primeiro nome deve ser uma string." })
    @Length(1, 100, { message: "O primeiro nome deve ter entre 1 e 100 caracteres." })
    @IsNotEmpty({ message: "O primeiro nome é obrigatório." })
    first_name!: string;
  
    @IsString({ message: "O sobrenome deve ser uma string." })
    @Length(1, 100, { message: "O sobrenome deve ter entre 1 e 100 caracteres." })
    @IsNotEmpty({ message: "O sobrenome é obrigatório." })
    last_name!: string;
  
    @IsEmail({}, { message: "O email deve ser válido." })
    @IsNotEmpty({ message: "O email é obrigatório." })
    email!: string;
  
    @IsString({ message: "O telefone deve ser uma string." })
    @Length(1, 20, { message: "O telefone deve ter entre 1 e 20 caracteres." })
    @IsNotEmpty({ message: "O telefone é obrigatório." })
    phone!: string;
  
    @IsString({ message: "A URL do avatar deve ser uma string." })
    @IsOptional({ message: "A URL do avatar é opcional." })
    avatar_url?: string;
  
    @IsString({ message: "O status deve ser uma string." })
    @IsOptional({ message: "O status é opcional." })
    status?: string;
  }
  