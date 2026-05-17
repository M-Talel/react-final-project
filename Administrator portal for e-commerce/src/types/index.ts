export interface StoreInfo {
  id: number;
  name: string;
  description: string;
  phone_number: string;
}

export interface Product {
  id: number;
  description: string;
  name: string;
  origin: string;
  price: number;
}

export interface StoreData {
  store_info: StoreInfo[];
  coffee: Product[];
}
