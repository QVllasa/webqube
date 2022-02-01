import firebase from "firebase/compat";
import {IBoard, IScrumboard} from "./scrumboard.interface";

export interface IFeature {
  name: string,
  starterOneTime: boolean,
  professionalOneTime: boolean,
  businessOneTime: boolean,
  starterMonthly: boolean,
  professionalMonthly: boolean,
  businessMonthly: boolean,
  custom: boolean,
  starterTextOneTime?: string,
  professionalTextOneTime?: string,
  businessTextOneTime?: string,
  starterTextMonthly?: string,
  professionalTextMonthly?: string,
  businessTextMonthly?: string
}

export interface ITier {
  id: string
  monthlyPrice: number,
  fixPrice: number,
  features: string[],
  description: string,
  plan: string,
  mostSelected: boolean,
  icon: string,
  selected: boolean,
}

export interface IFaq {
  question: string,
  answer: string
}

export interface ITeamMember {
  role: string,
  name: string,
  description: string,
  twitter: string,
  linkedin: string
}


export interface IClient {
  name: string,
  email: string,
  business: string,
  password: string,
}

export interface IIndividualRequest extends IClient {
  message: string,
}

export interface IMessage {
  name: string,
  email: string,
  phone: number,
  message: string,
}

export interface IProject {
  id: string,
  userID: string,
  title: string,
  date?: string,
  tierID?: ITier['id'],
  domain: string,
  boards?: IBoard[];
}

export interface IMilestone {
  id?: string,
  order: number,
  label: string,
  description: string,
  icon: string,
  icon_classes: string,
}



export interface ITask {
  title: string,
  description: string,
}

export interface IWork {
  id: string,
  title: string,
  subtitle: string,
  description: string,
  technologies: string,
  features: string,
  performance: number,
  accessibility: number,
  seo: number,
  link: string,
  year: string,
  img: string,
  featured: boolean,
  tags?: string[],
}


export interface IUser extends firebase.User {
}
