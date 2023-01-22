import { Omit } from 'utility-types';

export const RequestMethods = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
};

export interface IIngredientType {
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
  key?: string;
}

export interface IUser {
  user: IUserFields;
}

export interface IUserFields {
  name?: string;
  email?: string;
}

export interface IConstructorElement {
  text: string;
  thumbnail: string;
  price: number;
  type?: 'top' | 'bottom';
  isLocked?: boolean;
  extraClass?: string;
  handleClose?: () => void;
  key?: string;
}

export interface IProfile {
  name: string;
  email: string;
  password: string;

  [key: string]: any;
}

export interface IUserActionsFields {
  email?: string;
  password?: string;
  token?: string;
}

export interface INavigationItem {
  title: string;
  value: string;
  link?: string;
  onSelectTab?: () => void;
}

export interface IIngredientsStore {
  all: IIngredientType[];
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;

  selected: IIngredientType[];

  currentIngredient: IIngredientType | {};
}

interface IOrderParams {
  ingredients: IIngredientType[];
  _id: string;
  owner?: {
    name?: string;
    email?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  status: string;
  name: string;
  createdAt: string;
  updatedAt?: string;
  number: number;
  price: number;
}

export interface IOrder {
  order?: IOrderParams;
}

export interface IOrderStore {
  newOrder: IOrder;
  orderRequest: boolean;
  orderFailed: boolean;
  getOrderInfoRequest: boolean;
  getOrderInfoFailed: boolean;
  orderInfo: IOrdersAllItem | null;
}

export interface IUserStore {
  registerRequest: boolean;
  registerFailed: boolean;
  user: IUserFields | {};

  loginRequest: boolean;
  loginFailed: boolean;

  forgotPasswordRequest: boolean;
  forgotPasswordFailed: boolean;
  isForgotPasswordSuccess: boolean;

  resetPasswordRequest: boolean;
  resetPasswordFailed: boolean;
  isResetPasswordSuccess: boolean;

  logoutRequest: boolean;
  logoutFailed: boolean;

  refreshTokenRequest: boolean;
  refreshTokenFailed: boolean;

  getUserInfoRequest: boolean;
  getUserInfoFailed: boolean;

  updateUserInfoRequest: boolean;
  updateUserInfoFailed: boolean;
}

export interface IGetUserResponse {
  success: boolean;
  user: IUserFields;
}

export interface ILoginResponse extends IGetUserResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IMessageResponse {
  message: string;
  success: boolean;
}

export type IRefreshTokenResponse = Omit<ILoginResponse, 'user'>;

export interface IOrderResponse {
  success: boolean;
  name: string;
  order: IOrderParams;
}

export interface IGetIngredientsResponse {
  data: IIngredientType[];
  success: boolean;
}

export enum WebsocketStatus {
  CONNECTING = 'CONNECTING...',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

export interface IOrdersAllItem {
  ingredients: string[];
  _id: string;
  status: string;
  number: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  owner?: string;
  __v?: string;
}

export interface IOrdersAll {
  success: boolean;
  orders: IOrdersAllItem[];
  total: number;
  totalToday: number;
}

export enum OrderStatus {
  DONE = 'done',
  PENDING = 'pending',
  CREATED = 'created',
}

export const OrderStatusValue = {
  [OrderStatus.DONE]: 'Выполнен',
  [OrderStatus.PENDING]: 'В работе',
  [OrderStatus.CREATED]: 'Принят',
};

export interface IGetOrderInfoResponse {
  orders: IOrdersAllItem[];
  success: boolean;
}
