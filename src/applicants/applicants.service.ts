import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PDFFile } from 'src/pdf/pdf.entity';
import { createQueryBuilder, getRepository, Repository } from 'typeorm';
import { Applicants } from './applicants.entity';
import { ApplicantCredentials } from './dto/ApplicantCredentials.dto';

@Injectable()
export class ApplicantsService {
  constructor(
    @InjectRepository(Applicants)
    private applicantsRepo: Repository<Applicants>,
    @InjectRepository(PDFFile)
    private pdfRepo: Repository<PDFFile>,
  ) {}

  async createApplicant(
    body: ApplicantCredentials,
    file: any,
  ): Promise<ApplicantCredentials> {
    delete body.cv;
    console.log(file);

    const PDF = new PDFFile();
    const User = new Applicants();

    PDF.name = file.originalname;
    PDF.size = file.size;
    PDF.path = `http://localhost:3030/applicants/pdf/${file.filename}`;
    const savedPdf = await this.pdfRepo.save(PDF);

    for (let x in body) {
      User[x] = body[x];
    }

    User.pdf = savedPdf;

    return this.applicantsRepo.save(User);
  }

  async getApplicants(): Promise<ApplicantCredentials[]> {
    //@ts-ignore
    return this.applicantsRepo.find({ relations: ['pdf']});
  }

  async getApplicantsStatusesCount() {
    try{

      const initial = await createQueryBuilder("applicants").where("status = :status", {status: "Initial"}).getCount()
      const firstContact = await createQueryBuilder("applicants").where("status = :status", {status: "First Contact"}).getCount()
      const techAssignment = await createQueryBuilder("applicants").where("status = :status", {status: "Tech Assignment"}).getCount()
      const rejected = await createQueryBuilder("applicants").where("status = :status", {status: "Rejected"}).getCount()
      const hired = await createQueryBuilder("applicants").where("status = :status", {status: "Hired"}).getCount()
      const interview =  await createQueryBuilder("applicants").where("status = :status", {status: "Interview"}).getCount()
      
      const counts = {initial,firstContact,techAssignment,rejected,hired,interview}
      const all = Object.values(counts).reduce((acc,val) => acc+=val , 0)
      counts["all"] = all
      return counts
    }catch(err){
      throw new Error("something went wrong");
      
    }
  }

    async findBySomething(searchString: string): Promise<any> {
      const foundItems = await getRepository(Applicants)
                                .createQueryBuilder("applicants")
                                .where(`applicants.firstName ILIKE :searchString OR 
                                        applicants.lastName ILIKE :searchString OR
                                        applicants.skills ILIKE :searchString OR
                                        applicants.position ILIKE :searchString OR
                                        applicants.phone ILIKE :searchString OR
                                        applicants.email ILIKE :searchString
                                        `, {searchString: `%${searchString}%`})
                                .getMany()
     
      return foundItems
    }

    async getApplicant(id: string): Promise<Applicants> {
      try{
        return this.applicantsRepo.findOne({where: {id}, relations: ['pdf']})
      }catch(err) {
        throw new Error(`applicant with id ${id} does not exist`);
      }
    }
}
