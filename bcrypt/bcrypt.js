// bcrypt 암호화
const bcrypt = require("bcrypt");

const makeHash = async (password, saltRounds) => {
    return await bcrypt.hash(password, saltRounds);
};

const main = async () => {
    const hashedPassword = await makeHash(password, saltRounds);
    console.log(hashedPassword);
};

// 검증
const checkHash = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword); // (1)
};

module.exports = { main, makeHash, checkHash };
