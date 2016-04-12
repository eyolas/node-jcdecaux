export interface JCDecauxParams {
  contractName?: string;
  urlApi?: string;
  timeout?: number;
}

export interface RequestParams {
  apiKey?: string;
  contract?: string;
}

export interface Position {
  lat: number;
  lng: number;
}

export interface Contract {
  name: string;
  commercial_name: string;
  country_code: string;
  cities: Array<string>;
}

export interface Station {
  number: number,
  name: string,
  address: string,
  position: Position,
  banking: boolean,
  bonus: boolean,
  status: string,
  contract_name: string,
  bike_stands: number,
  available_bike_stands: number,
  available_bikes: number,
  last_update: number
}
