const API_URL = 'https://norma.nomoreparties.space/api';

export const apiRequest = async (url, data = {}, method = 'GET') => {
  try {
    const params =
      method === 'GET'
        ? {}
        : {
            method,
            headers: {
              'Content-Type': 'application/json',
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
  } catch (e) {
    console.log(`Fetch ${url} error`, e);
    console.error(e);
  }
};
