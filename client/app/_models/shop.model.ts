
export class Shop {
  id: number;
  name: string;
  category: number;
  seller: number;
  lng: number;
  lat: number;
  address: string;
  category_name: string;
  validated:boolean;
  rejected: boolean;
  reject_reason: string;
}

export class Category {
    id: number;
    name: string;
}