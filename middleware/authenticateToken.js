const jwt=require('jsonwebtoken');
const JWT_SECRET="12345";

function authenticateToken(fallbackView) {
  return function (req, res, next) {
    const token = req.cookies.token;

    if (!token) {
      return res.render(fallbackView); 
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.render(fallbackView); 
      }

      req.user = user;
      next();
    });
  };
}

module.exports = authenticateToken;
