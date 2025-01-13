export interface Beer {
  beer_id: number;
  name: string;
  price: number;
  description: string;
  color: string;
  abv: number;
  picture_url: string;
  production_date: Date;
  brewery_id: number;
  brewery: string
}
