import {
  IsInt,
  IsString,
  IsOptional,
  IsNotEmpty,
  Length,
} from "class-validator";

export class CreateVehicleDto {
  @IsInt({ message: "O ID do motorista deve ser um número inteiro." })
  @IsNotEmpty({ message: "O ID do motorista é obrigatório." })
  driver_id!: number;

  @IsString({ message: "A placa deve ser uma string." })
  @Length(1, 20, { message: "A placa deve ter entre 1 e 20 caracteres." })
  @IsNotEmpty({ message: "A placa é obrigatória." })
  plate!: string;

  @IsString({ message: "O modelo deve ser uma string." })
  @Length(1, 100, { message: "O modelo deve ter entre 1 e 100 caracteres." })
  @IsOptional({ message: "O modelo é opcional." })
  model?: string;

  @IsString({ message: "O tipo deve ser uma string." })
  @Length(1, 50, { message: "O tipo deve ter entre 1 e 50 caracteres." })
  @IsOptional({ message: "O tipo é opcional." })
  type?: string;

  @IsString({ message: "A capacidade deve ser uma string." })
  @Length(1, 10, { message: "A capacidade deve ter entre 1 e 10 caracteres." })
  @IsOptional({ message: "A capacidade é opcional." })
  capacity?: string;
}
