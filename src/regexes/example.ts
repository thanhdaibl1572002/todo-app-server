export const FIRST_NAME_REGEX = /^[a-zA-ZÀ-ỹ]+([ '-][a-zA-ZÀ-ỹ]+)*$/
export const LAST_NAME_REGEX = /^[a-zA-ZÀ-ỹ]+([ '-][a-zA-ZÀ-ỹ]+)*$/
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const PHONE_REGEX = /^[0-9]{10}$/
export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{8,}$/