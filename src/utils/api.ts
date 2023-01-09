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

  const res = await fetch(`${API_URL}${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.localStorage.getItem('token'),
    },
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
