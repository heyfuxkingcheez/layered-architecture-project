const bcrypt = require("bcrypt");

const makeHash = async (password, saltRounds) => {
    return await bcrypt.hash(password, saltRounds);
};

const main = async () => {
    const hashedPassword = await makeHash(password, saltRounds);
    console.log(hashedPassword);
};

module.exports = { main, makeHash };
