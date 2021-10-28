export interface IFeature{
  name: string,
  starterOneTime:boolean,
  professionalOneTime: boolean,
  businessOneTime: boolean,
  starterMonthly:boolean,
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

export interface IPriceCard{
  monthlyPrice: number,
  fixPrice: number,
  features: string[],
  description: string,
  plan: string,
  mostSelected: boolean,
}

export interface IFaq{
  question: string,
  answer:string
}

export interface ITeamMember{
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
}

export interface IMessage {
  name: string,
  email: string,
  phone: number,
  message: string,
}

export interface IProject{
  id: string,
  name:string,
  link: string,
  year:string,
  img:string,

}
