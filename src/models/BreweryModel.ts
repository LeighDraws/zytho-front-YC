export interface Brewery {
  brewery_id: number;
  name: string;
  country: string;
  region: string;
  description: string;
  address: string;
  picture_url: string;

  website_url?: string;
  user_id?: number;
}
