const jwt=require('jsonwebtoken');
const JWT_SECRET="12345";

function authenticateToken(fallbackView) {
  return function (req, res, next) {
    const token = req.cookies.token;

    if (!token) {
      return res.render(fallbackView); // If no token, render fallback view
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.render(fallbackView); // If token is invalid or expired
      }

      req.user = user;
      next();
    });
  };
}

module.exports = authenticateToken;