const wrapper = <T>(fetcher: Promise<Response>): Promise<T> => {
  return new Promise((resolve, reject) => {
    fetcher
      .then((response) => {
        if (response.ok) {
          response
            .json()
            .then((d) => resolve(d))
            .catch((error) => reject(error));
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const fetcher = <T = any>(input: RequestInfo): Promise<T> => {
  return wrapper<T>(fetch(input));
};

export default fetcher;
