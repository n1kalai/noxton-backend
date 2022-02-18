import { PDFFile } from 'src/pdf/pdf.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Applicants extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  salaryRange: string;

  @Column()
  position: string;

  @Column()
  experience: string;

  @Column()
  skills: string;

  @Column()
  linkedInURL: string;

  @Column({ default: 'Initial' })
  status: string;

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToOne(() => PDFFile, (pd) => pd.user, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'pdf-ID',
    referencedColumnName: 'id',
  })
  pdf: PDFFile;
}
