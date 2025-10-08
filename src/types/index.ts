export interface Product {
  id: string;
  main: string; // image url
  [key: string]: any; // allow dynamic key-value pairs
}

export interface ApiResponse {
  data: Product[];
  _metadata: Record<string, any>;
}
