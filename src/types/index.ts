export interface Product {
  _id: string;
  reference?: string;
  brand?: string;
  color?: string;
  bezel?: string;
  bracelet?: string;
  diameter?: string;
  materials?: string;
  model?: string;
  images?: {
    watch?: string;
    dial?: string;
  };
  [key: string]: any; // other dynamic properties
}

export interface ApiResponse {
  data: Product[];
  _metadata?: Record<string, any>;
}
