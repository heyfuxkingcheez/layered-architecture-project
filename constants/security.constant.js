import "dotenv/config";

export const PASSWORD_SALT_ROUNDS = process.env.PASSWORD_SALT;

export const TOKENKEY = process.env.TOKENKEY;

export const JWT_ACCESS_TOKEN_EXPIRES_IN = "12h";
