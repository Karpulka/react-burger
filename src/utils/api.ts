import { RequestMethods } from './types';

const API_URL = 'https://norma.nomoreparties.space/api';

export const apiRequest = async <T, R>(
  url: string,
  data: T | {} = {},
  method: string = RequestMethods.GET
): Promise<R> => {
  const params =
    method === RequestMethods.GET
      ? {}
      : {
          body: JSON.stringify(data),
        };

  const token = window.localStorage.getItem('token');

  let headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers = {
      ...headers,
      Authorization: 'Bearer ' + token,
    };
  }

  const res = await fetch(`${API_URL}${url}`, {
    method,
    headers,
    ...params,
  });

  if (!res.ok) {
    return Promise.reject(`Ошибка ${res.status}`);
  }

  const response = await res.json();

  if (response.success) {
    return response;
  } else {
    throw res;
  }
};
