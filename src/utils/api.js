const API_URL = 'https://norma.nomoreparties.space/api';

export const apiRequest = async (url, data = {}, method = 'GET') => {
  const params =
    method === 'GET'
      ? {}
      : {
          method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + window.localStorage.getItem('token'),
          },
          body: JSON.stringify(data),
        };

  const res = await fetch(`${API_URL}${url}`, params);

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
