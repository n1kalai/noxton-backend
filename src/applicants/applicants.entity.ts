import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Applicants extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    position: string

    @Column()
    salaryRange: string

    @Column()
    linkedInURL: string

    @Column({default: 'Initial'})
    status: string
}