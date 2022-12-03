export const SIGNUP_USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
export const SIGNUP_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
export const EMAIL_REGEX = /^[a-z0-9]([a-z0-9_\-\.]*)@([a-z0-9_\-\.]*)(\.[a-z]{2,4}(\.[a-z]{2}){0,2})$/i;
export const FIRST_LAST_NAME_REGEX = /^[a-z ,.'-]+$/i;
export const SIGNUP_URL = '/register';