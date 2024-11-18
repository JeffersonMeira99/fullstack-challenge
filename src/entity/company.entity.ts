import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToMany,
} from "typeorm";
import { Driver } from "./driver.entity";

@Entity("company")
@Index("name", ["name"], { unique: true })
@Index("city", ["city"])
@Index("creation_date", ["creation_date"])
export class Company {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100, unique: true })
  name!: string;

  @Column({ type: "int" })
  city!: number;

  @Column({ type: "varchar", length: 20, nullable: true })
  status!: string | null;

  @Column({ type: "varchar", length: 20, nullable: true })
  plan_type!: string | null;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    nullable: false,
  })
  creation_date!: Date;

  @OneToMany(() => Driver, (driver) => driver.company)
  drivers!: Driver[];
}
