import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PDFFile } from 'src/pdf/pdf.entity';
import { Updates } from 'src/updates/updates.entity';
import { Between, createQueryBuilder, getRepository, Repository } from 'typeorm';
import { Applicants } from './applicants.entity';
import { ApplicantCredentials } from './dto/ApplicantCredentials.dto';

@Injectable()
export class ApplicantsService {
  constructor(
    @InjectRepository(Applicants)
    private applicantsRepo: Repository<Applicants>,
    @InjectRepository(PDFFile)
    private pdfRepo: Repository<PDFFile>,
    @InjectRepository(Updates)
    private updatesRepo: Repository<Updates>,
  ) {}

  async createApplicant(
    body: ApplicantCredentials,
    file: any,
  ): Promise<ApplicantCredentials> {
    delete body.cv;
    const PDF = new PDFFile();
    const User = new Applicants();

    PDF.name = file.originalname;
    PDF.size = file.size;
    PDF.path = `http://localhost:3030/applicants/cv/${file.filename}`;
    const savedPdf = await this.pdfRepo.save(PDF);

    for (let x in body) {
      User[x] = body[x];
    }

    User.cv = savedPdf;

    return this.applicantsRepo.save(User);
  }

  async getApplicants(): Promise<Applicants[]> {

    return this.applicantsRepo.find({ relations: ['cv']});
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
      throw new Error(`something went wrong: ${err.message}`);
      
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
        return this.applicantsRepo.findOne({where: {id}, relations: ['cv', "updates"]})
      }catch(err) {
        throw new NotFoundException(`applicant with id: ${id} does not exist`);
      }
    }

    async getApplicantsByDate(data): Promise<Applicants[]> {
      const {startDate,endDate} = data
     const query = await this.applicantsRepo.find({
       where: {createdAt: Between(startDate, endDate)}
     })
      return query;
    }

    async addUpdateToApplicant(body): Promise<Applicants> {
      const {fieldName,fieldValue,applicantId: id,type} = body;

      const applicant = await this.applicantsRepo.findOne({where: {id}, relations: ["updates"]})
      if(!applicant){
        throw new NotFoundException(`applicant with id: ${id} not found`)
      }

      try {
        
        const updates = new Updates();
        updates.type = fieldName;
        updates.beforeUpdate = applicant[fieldName]
        updates.afterUpdate = fieldValue
        updates.userName = "Nikoloz Palag"  // we should retrive user credientals from request
        
        applicant[fieldName] = fieldValue
        const savedUpdate = await this.updatesRepo.save(updates)

        applicant.updates.push(savedUpdate);
      
        return this.applicantsRepo.save(applicant)

    }catch(err){
      throw new Error(`something went wrong: ${err.message}`)
    }
     
    }
}
