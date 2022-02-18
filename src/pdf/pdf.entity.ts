import { Applicants } from 'src/applicants/applicants.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PDFFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  size: number;

  @Column({ nullable: true })
  path: string;

  @OneToOne(() => Applicants, (ap) => ap.cv, { onDelete: 'CASCADE' })
  user: Applicants;
}
