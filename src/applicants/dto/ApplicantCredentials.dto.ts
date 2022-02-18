import { PDFFile } from "../../pdf/pdf.entity";

export type ApplicantCredentials = {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
  salaryRange: string;
  skills: string;
  linkedInURL: string;
  status: string;
  experience: string;
  cv?: PDFFile;
};