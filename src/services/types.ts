import { ThunkAction, Action, ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { ReactChild } from "react";
import { store } from "./store";

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

export type TBurgerGroupById = {
  item: TBurger;
  count: number
};

export type TPosition = 'top' | 'bottom';

export type TCheckSuccess<T> = T & {
  success: boolean;
  message: string;
};

export type TGetIngredientsData = {
  data: Array<TBurger>;
}

export type TUserAndEmail = {
  email: string;
  name: string;
}

export type TLoginUser = TInfoUser & TTokenUser;

export type TTokenUser = {
  accessToken: string;
  refreshToken: string;
}

export type TInfoUser = {
  user: TUserAndEmail;
}
export type TOrder = {
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
}

export type TCreateOrder = {
  name: string;
  order: TOrder;
}

export type TWSAction = {
  wsInit: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
};

export type TWSOrder = Omit<TOrder, "ingredients" | "owner" | "price"> &
{
  ingredients: Array<string>;
  dateBeautifulString: string;
};

export type TWSOrders = {
  success: boolean;
  total: number;
  totalToday: number
  orders: Array<TWSOrder>;
}

export type TShowModal = {
  title: string;
  content: ReactChild;
  isNavigateGoBack: boolean;
}

export type TMoveIngredient = {
  dragIndex: number;
  hoverIndex: number;
}

export type TTokenState = {
  loading: boolean,
  error: string,
};

export type TAllIngredientsState = {
  items: Array<TBurger>
  loading: boolean,
  error: string,
};

export type TCurentIngredientState = {
  flagClear: boolean,
  item: TBurger | null,
};

export type TSelectedIngredientsState = {
  items: Array<TBurger>
};

export type TModalState = {
  isShowModal: boolean,
  titleModal: string,
  isNavigateGoBack: boolean,
  contentModal: ReactChild | null
};

export type TWebSocketState = {
  isConnected: boolean;
  orders: TWSOrders | null;
  error: string;
}

export type TOrderState = {
  loading: boolean,
  order: TOrder | null,
  error: string
};

export type TPasswordState = {
  allowResetPassword: boolean,
  loading: boolean,
  error: string,
};

export type TUserState = {
  user: TUserAndEmail | null
  loggedIn: boolean,
  loading: boolean,
  error: string,
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch & ThunkDispatch<RootState, null, AnyAction>
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>
