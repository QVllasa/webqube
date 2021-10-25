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
