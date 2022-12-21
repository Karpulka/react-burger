export enum RequestMethods {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
}

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
  user: {
    name?: string;
    email?: string;
  };
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

export interface INavigationItem {
  title: string;
  value: string;
  link: string;
  onSelectTab?: () => void;
}
