
export type TBurger = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  key: string;
  index: number;
};


export type TPosition = 'top' | 'bottom';

export interface CustomizedState {
  pathnameModal: string | undefined;
  ingredientId: string | undefined;
  location: Location;
}