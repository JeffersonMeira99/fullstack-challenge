import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany, // Import the OneToMany decorator
  JoinColumn,
} from "typeorm";
import { Company } from "./company.entity"; 
import { Vehicle } from "./vehicle.entity"; 

@Entity("driver")
export class Driver {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "int" })
  company_id!: number;

  @Column({ type: "varchar", length: 100 })
  first_name!: string;

  @Column({ type: "varchar", length: 100 })
  last_name!: string;

  @Column({ type: "varchar", length: 100 })
  email!: string;

  @Column({ type: "varchar", length: 100 })
  phone!: string;

  @Column({ type: "varchar", nullable: true })
  avatar_url!: string | null;

  @Column({ type: "varchar", length: 20, nullable: true })
  status!: string | null;

  @ManyToOne(() => Company, (company) => company.drivers)
  @JoinColumn({ name: "company_id" })
  company!: Company;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.driver)
  vehicles!: Vehicle[];
}
