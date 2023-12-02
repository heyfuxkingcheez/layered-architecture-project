// bcrypt 암호화

import bcrypt from "bcrypt";
import { PASSWORD_SALT_ROUNDS } from "../constants/security.constant.js";

const makeHash = async (password, PASSWORD_SALT_ROUNDS) => {
    return await bcrypt.hash(password, PASSWORD_SALT_ROUNDS);
};

const main = async () => {
    const hashedPassword = await makeHash(password, PASSWORD_SALT_ROUNDS);
    console.log(hashedPassword);
};

// 검증
const checkHash = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword); // (1)
};

export { main, makeHash, checkHash };
