import {regexEmail} from "./constants/regex.ts";

export const validateEmail = (email: string): boolean => {
   return regexEmail.test(email);
}
export const validatePassword = (password: string): boolean => {
   return password.length >= 6 && password.length <= 25
}
export const validateUsername = (username: string): boolean => {
   return username.length >= 5 && username.length <= 20
}
