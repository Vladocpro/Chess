import axios from "./axios.ts";

export const getFetch = (url: string) => axios.get(url)
    .then((res) => res.data)
    .catch((error) => {
       if (error.response?.data?.invalidTokenError) {
          // Redirect to the login page
          window.location.assign('/login');
       }
       return Promise.reject(error)
    })
export const postFetch = (url: string, data: any) => axios.post(url, data)
    .then((res) => res.data)
    .catch((error) => {
       if (error.response?.data?.invalidTokenError) {
          // Redirect to the login page
          window.location.assign('/login');
       }
       return Promise.reject(error)
    })
