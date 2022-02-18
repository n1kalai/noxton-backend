import { Applicants } from "src/applicants/applicants.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Updates {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    type: string;

    // if we wanted to add dozens of comments to updates
    // @ManyToMany()
    // comments: Comments[]    

    @Column({nullable: true})
    comment: string;

    @CreateDateColumn()
    createdAt: Date

    // if we had registration and amount of users,
    // it should be related to users as ManyToMany
    @Column()
    userName: string

    @Column()
    beforeUpdate: string;
    
    @Column()
    afterUpdate: string;

    @ManyToOne(() => Applicants, ap => ap.updates)
    applicant: Applicants

    

}