import { IGraphDataModel } from './common.model'

export interface ICountry {
  id: number
  countryId: number
  name: string
  countryCode: string
}
export interface IState {
  id: number
  name: string
}
export interface ICity {
  id: number
  name: string
}

export type ICountryModel = {
  country: IGraphDataModel<ICountry[]>
  state: IGraphDataModel<IState[]>
  city: IGraphDataModel<ICity[]>
}
