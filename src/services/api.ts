import axios, { AxiosError } from "axios";
import { setCookie, parseCookies } from 'nookies';
import { signOut } from "../contexts/AuthContext";
import { AuthTokenError } from "./errors/AuthTokenError";


type FailedRequestQueue = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
};


let isRefreshing = false
let failedRequestQueue = Array<FailedRequestQueue>();

export function setupAPIClient(context = undefined) {
  let cookies = parseCookies(context);

  const api = axios.create({
    baseURL: 'https://estabelecimentos.wfbtecnologia.com.br',
    headers: {
      Authorization: `Bearer ${cookies['estabelecimentos.token']}`
    }
  });


  api.interceptors.response.use(response => {
    return response;
  }, (error: AxiosError) => {
    if (error.response.status == 401) {
      if (error.response.data?.message === "Inavalid Token") {

        cookies = parseCookies();

        const { 'estabelecimentos.refreshToken': refresh_token } = cookies;

        const originalConfig = error.config;

        if (!isRefreshing) {
          isRefreshing = true

          api.post('/authenticate/sessions/refreshToken', {
            token: refresh_token,
          }).then(response => {
            const { token } = response.data;
            console.log(response.data)
            setCookie(context, 'estabelecimentos.token', token, {
              maxAge: 60 * 60 * 24 * 30,
              path: "/"
            })

            setCookie(context, 'estabelecimentos.refreshToken', response.data.refresh_token, {
              maxAge: 60 * 60 * 24 * 30,
              path: "/"
            })

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            failedRequestQueue.forEach(request => request.onSuccess(token));
            failedRequestQueue = [];
          }).catch((err) => {
            failedRequestQueue.forEach(request => request.onFailure(err));
            failedRequestQueue = [];

            if (process.browser) {
              signOut()
            }

          }).finally(() => {
            isRefreshing = false
          });
        }

        return new Promise((resolve, reject) => {
          failedRequestQueue.push({
            onSuccess: (token: string) => {
              if (!originalConfig?.headers) {
                return
              }

              originalConfig.headers['Authorization'] = `Bearer ${token}`
              resolve(api(originalConfig))
            },
            onFailure: (error: AxiosError) => {
              reject(error);
            }
          })
        })
      } else {
        if (process.browser) {
          signOut()
        } else {
          return Promise.reject(new AuthTokenError)
        }
      }
    }
    return Promise.reject(error);
  });

  return api
}


