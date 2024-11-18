import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from "typeorm";
import { Driver } from "./driver.entity";

@Entity("vehicle")
@Index("driver_id", ["driver_id"])
@Index("type", ["type"])
@Index("creation_date", ["creation_date"])
export class Vehicle {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "int" })
  driver_id!: number;

  @Column({ type: "varchar", nullable: true })
  plate!: string;

  @Column({ type: "varchar", nullable: true })
  model!: string;

  @Column({ type: "varchar", nullable: true })
  type!: string;

  @Column({ type: "varchar", nullable: true })
  capacity!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  creation_date!: Date;

  @ManyToOne(() => Driver, (driver) => driver.vehicles)
  @JoinColumn({ name: "driver_id" })
  driver!: Driver;
}
