const {findUser} = require('./db');
const bcrypt = require('bcrypt');

// Takes in two passwords, the hashed from the db and the non-hashed from user to check if they match
const comparePassword = async (password, hashedUserPassword) => {
    try {
      const match = await bcrypt.compare(password, hashedUserPassword);
      console.log('hash compare', hashedUserPassword)
      return match;
    } catch (error) {
      throw error;
    }
  };
    
//function called in the serverUserData.js to compare passwords
async function checkPassword(name, surname, type, password){
    const getPassword = true;
    //specific configration to get only this user password
    const hashedUserPassword = await findUser(name, surname, type, getPassword);
    return await comparePassword(password, hashedUserPassword);
} 

module.exports = {
    checkPassword,
}