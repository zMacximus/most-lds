import { z } from "zod";
import { UrlObject } from "url";
// import { icons } from "./nav-links";

//Custom Links for sidenav URLs

export interface CustomLink {
  name: string;
  href: string | UrlObject;
  icon: string;
}

export const customLinkSchema = z.object({
  name: z.string(),
  href: z.union([z.string(), z.object({})]),
  icon: z.any(),
});

//Custom User
export interface UserSchema {
  username: string; //maybe base the profile pic filename of of the username id?
  password: string;
  admin: boolean;
  firstName: string;
  lastName: string;
  department: string;
  title: string;
  address: string;
  religion: string;
  birthDay: Date;
  joinDate: Date;
}

export const customUserSchema = z.object({
  username: z.string(),
  password: z.string(),
  admin: z.boolean(),
  firstName: z.string(),
  lastName: z.string(),
  department: z.string(),
  title: z.string(),
  address: z.string(),
  religion: z.string(),
  birthDay: z.date(),
  joinDate: z.date(),
});

export type AdminFormInput = {
  // firstName: any;
  // id: number;
  employeeName: string;
  division: string;
  position: string;
  employmentStatus: string;
  officerInCharge: string;
  titleOfLD: string;
  dateOfLD: Date;
  venue: string;
  numberOfHours: number;
  serviceProvider: string;
  modeOfLD: string;
  level: string;
  natureOfParticipation: string;
  typeOfLD: string;
  sponsored: boolean;
  withinJobDesc: boolean;
  recentLD: boolean;
  previousLD: string | null;
  previousLDDate: Date | null;
  previousLDVenue: string | null;
  prevLDPostFormSubmitted: boolean | null;
  postLDReEcho: boolean;
  postFormSubmission: boolean;
  // formStatus: boolean;
  submittedBy: string;
};

export type IDPFormInput = {
  name: string;
  submittedBy: string;
  position: string;
  yearsInThePosition: number;
  division: string;
  objectives?: string | null;
  areasOfStrength?: string | null;
  areasOfDevelopment?: string | null;
  targetCompetencyTraining?: string | null;
  targetScheduleOfCompletion: Date;
  formStatus?: number;
  notedBy: string;
};

export type EmployeeFormInput = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  // password?: string;
  birthDay: Date;
  address: string;
  religion: string;
  department: string;
  title: string;
  employmentStatus: string;
  phoneNumber: string;
  maritalStatus: string;
  admin: boolean;
  joinDate: Date;
  image: string;
};

export type TopicFormInput = {
  topicTitle: string;
  categoryName: string;
  createdBy: string;
};

export type SubTopicFormInput = {
  mainTopicId: number;
  subTopicTitle: string;
  url: string;
  typeOfContent: 0 | 1 | 2 | number; //0 = PDF; 1 = Video; 2 = PPT
  categoryName: string;
  uploadedBy: string;
};

export type employeeListData = {
  username: any;
  firstName: any;
  lastName: any;
  department: any;
  title: any;
  image: any;
};

export type TrainingFormInput = {
  title: string;
  code: string;
  modality: "On-Site" | "Online" | string;
  instructor: string;
  maxPopulation: number;
  status: boolean;
  url: string;
};

export type trainingListData = {
  id: number;
  code: string;
  title: string;
  modality: "On-Site" | "Online";
  currentPopulation: number;
  maxPopulation: number;
  instructor: string;
  status: statusBadgeBoolean;
};

export type statusBadgeBoolean = {
  open: true;
  closed: false;
};
