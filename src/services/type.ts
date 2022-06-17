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


export type TCheckSuccess<T> = T & { 
  success: boolean;
  message: string;
};

export type TGetIngredientsData = {
  data: Array<TBurger>;
}

type TUserAndEmail = {
  email: string;
  name: string;
}

export type TLoginUser = TInfoUser & TTokenUser;

export type TTokenUser = {
  accessToken: string;
  refreshToken: string;
}

export type TInfoUser = {
  user : TUserAndEmail;
}


export type TCreateOrder = {
  name: string;
  order: 
  {
      ingredients: Array<TBurger>;
      _id: string;
      owner: TUserAndEmail & {
          createdAt: Date;
          updatedAt: Date;
      }
      status: string;
      name: string;
      createdAt: Date;
      updatedAt: Date;
      number: number;
      price: number;
  };    
}