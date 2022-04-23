import firebase from "firebase/compat";
import {IBoard, IScrumboard} from "./scrumboard.interface";

export interface IFeatureDetail {
  value: boolean | number,
  used?: number,
  title?: string,
  order?: number,
  onPricingPage?: boolean,
  isAddon?: boolean,
  valueType?: string,
  price: number,
  icon?: string,
}

export interface IFeatures {
  [key: string]: IFeatureDetail
}

export interface IPlan {
  id?: string
  price: number,
  shortFeatures: string[],
  features: IFeatures,
  description: string,
  label: string,
  icon?: string,
  order: number
}

export interface IHosting {
  id?: string
  price: number,
  features: string[],
  label: string,
  icon?: string,
  order: number
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
  planID?: IPlan['id'],
  domain: string,
  boards?: IBoard[];
  features?: IFeatures,
  status: 'deleted' | 'active'
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
