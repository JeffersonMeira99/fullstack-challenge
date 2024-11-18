import * as dotenv from "dotenv";
import { createConnection } from "typeorm";
import { Driver } from "../entity/driver.entity";
import { Company } from "../entity/company.entity";
import { Vehicle } from "../entity/vehicle.entity";

dotenv.config();

export const initializeDatabase = async () => {
  try {
    await createConnection({
      type: "mysql",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || "3306"),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Driver, Company, Vehicle],
      synchronize: true,
      logging: true,
    });

    console.log("Database connected!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};
