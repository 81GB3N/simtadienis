const jwt = require('jsonwebtoken');
const crypto = require('crypto');



// Generate a random secret key
function generateSecretKey(){   
    const secretKey = crypto.randomBytes(32).toString('hex');
    console.log(secretKey);
    return secretKey;
}

// Sample payload (user information)
const generateJWT = (user) => {

    
    const payload = {
        name: user.name,
        surname: user.surname,
        role: 'admin'
    };
    
    // Secret key to sign the token (keep it secret and don't expose it publicly)
    const secretKey = generateSecretKey();
    
    // Generate JWT token
    const token = jwt.sign(payload, secretKey); 
    // const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
    
    console.log(token);
    return token;
}

module.exports = { generateJWT }